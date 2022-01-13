<template>
  <div class="card text-center m-3">

    <v-autocomplete
        v-model="selCountries"
        :items="countryList"
        label="Countries"
        auto-select-first
        clearable
        deletable-chips
        dense
        multiple
        rounded
        small-chips
        solo
    ></v-autocomplete>
    <!-- Document Header Starts
    <v-autocomplete
        v-model="selCities"
        :items="cityList"
        label="Cities"
        auto-select-first
        clearable
        deletable-chips
        dense
        multiple
        rounded
        small-chips
        solo
    ></v-autocomplete>

  -->

  </div>
</template>

<script>
import axios from 'axios';
import countryList from "../countryList.json";
//const cities = require('all-the-cities');

export default {
  name: "PatentFilters",

  data() {
    return {
      baseUrl: "http://84.252.122.16:3000/geoc_app?",
      request: "",
      cityList: ['München'],
      selCities: [],
      countryList: countryList,
      selCountries:[],
      testRequest: null,
      countryFilter: [],
      cities:['Mülheim an der Ruhr'],
      citySearchStr: ""
      //test: cities.filter(city => city.name.match('Albuquerque')),
    };
  },

  watch: {
    selCountries: async function () {
      if (this.selCountries.length === 0) {
      this.citySearchStr = ""
      this.request = this.baseUrl + this.citySearchStr + "&&filing_date=lte.2007-03-01" + "&&filing_date=gte.2007-02-27"
    }

    else {
        this.citySearchStr = "or=(name_0.eq." + this.selCountries[0]
        this.selCountries.forEach((country) => {this.citySearchStr += (",name_0.eq." + country)})
        this.citySearchStr += (")")
        this.request = this.baseUrl + this.citySearchStr + "&&filing_date=lte.2007-03-01" + "&&filing_date=gte.2007-02-27"
      }

      await axios.get(this.request)
          .then(response => {
                this.countryFilter = response.data;
                console.log("Fetched: " + this.countryFilter.length + " results")
              }
          )
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error)
          })
    }
  },

  //TEST, not actually used yet
  async created() {
    await axios.get("http://84.252.122.16:3000/tls209?appln_id=eq.45732519")
    .then(response => {
          this.testRequest = response.data[0].id
        }
    )
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error)
        })
  },
};

</script>

<style scoped>

</style>