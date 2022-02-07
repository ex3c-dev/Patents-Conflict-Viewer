import axios from "axios";

let baseUrl = "http://84.252.122.16:3000/geoc_app?"

const countryList = require('./countryList.json')
const patentAmountList = require('./patentamount.json')

export default {

    methods: {

        /**
         * Function to return number of patents registered in countries
         */
        getMax: function() {
            let patentMap = new Map()

            //Only needs to be run once
            //this.getPatentCountForCountry()

            patentAmountList.forEach((entry) =>{
                patentMap.set(entry.country, entry.amount)
            })
            return patentMap
        },

        /**
         *
         * Function to format request parametrically
         *
         * @param property
         * @param values
         */
        formatfilter(property, values=[]) {
            let str = ""
            if(values !== undefined && values.length > 0) {
                str += "&&" +property + "=in.("
                values.forEach((id, idx) => {
                    str += id
                    if (idx !== values.length -1) str += ","
                })
                str += ")"
            }
            return str
        },

        /**
         * Function to get number of registered patents in each country.
         * Is only run once and result is stored locally to save resources.
         */
        getPatentCountForCountry: async function() {

            let text = "[\n"
            let offset = 1
            var joinedPatents =  new Map

            let config = {
                headers: {
                    "prefer": "count=exact",
                }
            }

            await countryList.forEach((tmp,index) => {

                const fs = require("fs");
                let req = baseUrl + "name_0=in.(" + tmp + ")"
                let reqString = req + "&&limit=" + offset

                axios.get(reqString, config)
                    .then( response => {

                            let max = parseInt (response.headers["content-range"].split("/")[1])
                            joinedPatents.set(tmp, max)
                            console.log(tmp + "= " + joinedPatents.get(tmp))
                            text += "{\"country\": \"" + tmp + "\", \"amount\": " + joinedPatents.get(tmp) + "},\n"
                            //return joinedPatents
                            if(index === countryList.length-1) {
                                console.log("last")
                                text += "]"
                                console.log(text)
                                fs.writeFileSync("amountPatents.json", text, function (err){
                                    if (err){
                                        return console.log("error")
                                    }
                                })
                            }
                        }
                    )
                    .catch(error => {
                        this.errorMessage = error.message;
                        console.error("There was an error!", error)
                    })
                if(index === 3) {
                    console.log("last two")
                }
            })
            return joinedPatents.valueOf()
        }
    },
}


