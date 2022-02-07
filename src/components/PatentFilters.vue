<template>
  <div class="card text-center m-3">
    <v-autocomplete
        class="filter"
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
  </div>
</template>

<script>
import countryList from "../countryList.json";
import {bus} from "@/main";

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
    /**
     * Sends event when user selects countries for filtering
     * @returns {Promise<void>}
     */
    selCountries: async function () {

      bus.$emit('selected-countries', this.selCountries)
    },
  }
};

</script>

<style scoped>
.filter{
  transform: translateY(20px);
}
</style>