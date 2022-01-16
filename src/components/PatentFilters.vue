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

    <patent-type-filter :test=this.selCountries />

  -->

  </div>
</template>

<script>
import countryList from "../countryList.json";
import {bus} from "@/main";
//const cities = require('all-the-cities');

var test1

export {test1}

//TODO: create new country list and add missing countries / countries with alternate names from USD database
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

      bus.$emit('selected-countries', this.selCountries)
    },
  }


};

</script>

<style scoped>

</style>