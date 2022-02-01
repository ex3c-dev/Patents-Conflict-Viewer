import axios from "axios";

let baseUrl = "http://84.252.122.16:3000/geoc_app?"

const countryList = require('./countryList.json')

export default {
    methods: {
        test() {
            console.log("PRINTME");
            console.log(countryList.length)
        },

        getMax: async function() {

            let offset = 1
            var joinedPatents =  new Map

                let config = {
                headers: {
                    "prefer": "count=planned",
                }
            }

            await countryList.forEach((tmp,index) => {

                let req = baseUrl + "name_0=in.(" + tmp + ")"

                let reqString = req + "&&limit=" + offset

                axios.get(reqString, config)
                    .then( response => {

                            let max = parseInt (response.headers["content-range"].split("/")[1])
                            joinedPatents.set(tmp, max)
                            console.log(tmp + "= " + joinedPatents.get(tmp))
                            //return joinedPatents
                            if(index === countryList.length-1) {
                                console.log("last")
                            }
                        }
                    )
                    .catch(error => {
                        this.errorMessage = error.message;
                        console.error("There was an error!", error)
                    })
                if(index === 3) {
                    console.log("last two")
                    //return joinedPatents.valueOf()
                }
            })
            return joinedPatents.valueOf()
        },

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
    },

    }


