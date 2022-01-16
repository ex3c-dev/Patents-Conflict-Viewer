<template>
  <v-navigation-drawer dark color="primary" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Filter
        </v-list-item-title>
        <TestComponent></TestComponent>

      </v-list-item-content>
    </v-list-item>

    <v-divider style="margin-top: 10px; margin-bottom: 10px;"></v-divider>

    <v-row justify="center" >
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="([icon, text, content], i) in items" :key="i">
          <v-expansion-panel-header dark color="primary">
            <v-row>
            <v-icon style="margin-left: 20px; margin-right: 20px;">{{icon}}</v-icon>
            {{text}}
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="secondary">
            <component v-bind:is="content"></component>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import TestComponent from "./TestComponent"; // needs css-loader
import PatentFilters from "@/components/PatentFilters";
import PatentTypeFilter from "@/components/PatentTypeFilter";
import {bus} from "@/main";
import axios from "axios";
import countryList from "@/countryList.json";
import typelist from "@/types.json";
import ConflictTypeFilter from "@/components/ConflictInstigatorFilter";
import ConflictTargetFilter from "@/components/ConflictTargetFilter";
import conflictData from "../USD_data.json";

export default {
  name: "FilterBar",
  components: {
    TestComponent,
    PatentFilters
  },

  created() {

    bus.$on('selected-countries', (selCountries) => {
      this.selCountries = selCountries
    })
    bus.$on('selected-types', (selSections) => {
      this.selSections = selSections
    })
    bus.$on('selected-instigagors', (selInstigators) => {
      this.selInstigators = selInstigators
    })
    bus.$on('selected-targets', (selTargets) => {
      this.selTargets = selTargets
    })

    conflictData.forEach((event) => {this.instigatorList.push(event.ACTOR1)})
    conflictData.forEach((event) => {this.targetList.push(event.TARGET1)})

    //Returns all conflict data, as yet unfiltered, for the initial visualization. TODO: when patent server goes up, do the same for patent data
    this.filterEvents()

  },

  data: () => ({
    baseUrl: "http://84.252.122.16:3000/",
    tlsUrl: "http://84.252.122.16:3000/tls209?",
    tls: "tls209?",
    geoc: "geoc_app?",
    request: "",
    countryList: countryList,
    instigatorList : [],
    targetList: [],
    selCountries:[],
    sectionList: typelist,
    selSections: [],
    sectionFilterIDs:[],
    countryFilterIDs: [],
    responseIDs: [],
    selTargets: [],
    selInstigators: [],
    filteredEvents:[],
    items: [
      ['mdi-briefcase', 'Patent Type', PatentTypeFilter],
      ['mdi-layers', 'Regions', PatentFilters],
      ['mdi-format-list-bulleted-type', 'Conflict Instigator', ConflictTypeFilter],
      ['mdi-human', 'Conflict Target', ConflictTargetFilter],
    ],
  }),

  //TODO: Somewhere some id filter list needs to be emptied.
  watch: {
    selCountries: async function () {

      //Prepare request string
      this.countryFilterIDs = []
      this.typeSearchStr = ""

      if (this.selCountries.length === 0) {
        this.citySearchStr = ""
        this.request = this.baseUrl + this.geoc + this.citySearchStr + "&&limit=2000" //"&&filing_date=lte.2007-03-01" + "&&filing_date=gte.2007-02-27"
      }

      else {
        this.citySearchStr = "select=appln_id&&"
        //his.citySearchStr += "or=(name_0.eq." + this.selCountries[0]
        //this.selCountries.forEach((country) => {if (this.selCountries[0]!= country) this.citySearchStr += (",name_0.eq." + country)})

        this.citySearchStr += "name_0=in.(" + this.selCountries[0]
        this.selCountries.forEach((country) => {if (this.selCountries[0]!== country) this.citySearchStr += ("," + country)})

        this.citySearchStr += (")")
      }

      //Filter IDs that were selected in section filter
      if(this.selSections.length > 0) {
        this.typeSearchStr = this.formatIDfilter(this.sectionFilterIDs)
      }

      //Create Request
      this.request = this.baseUrl + this.geoc+ this.citySearchStr + this.typeSearchStr + "&&limit=2000" //"&&filing_date=lte.2007-03-01" + "&&filing_date=gte.2007-02-27"

     // console.log("Request is: "  + this.request)

      //Send request and save filtered IDS for further filtering
      this.sendRequest(this.request).then((response) => {
        if (response !== undefined)
          response.forEach((id) => {this.countryFilterIDs.push(id.appln_id)})
      })

      this.filterEvents()
    },

    selSections: async function () {

      //Prepare request string
      this.typeSearchStr = ""
      this.sectionFilterIDs = []

      if (this.selSections.length === 0) {
        this.request = this.baseUrl + this.tls + "&&limit=200"
      }

      else {
        this.typeSearchStr = "select=appln_id&&"
        this.typeSearchStr += "or=(ipc_class_symbol.like." + this.selSections[0] + "*"
        this.selSections.forEach((type) => {this.typeSearchStr += (",ipc_class_symbol.like." + type + "*")})
        this.typeSearchStr += ")"

        //TODO either page or remove hardcoded limit.

        //Filter out IDs that were selected in Region filter
        //Note: Some patents are however registered in multiple countries. Results for unfiltered Countries may therefore appear.
        if(this.selCountries.length > 0) {
          this.typeSearchStr += this.formatIDfilter(this.countryFilterIDs)
        }

        //Create Request
        this.request = this.baseUrl + this.tls + this.typeSearchStr + "&&limit=2000"

        //console.log("Request is: "  + this.request)
      }

      //Send request and save filtered IDS for further filtering
      this.sendRequest(this.request).then((response) => {
        if (response !== undefined)
            response.forEach((type) => {this.sectionFilterIDs.push(type.appln_id)})
      })
    },

    selInstigators: function () {

     this.filterEvents()
    },

    selTargets: function () {

      this.filterEvents()
    }
},

  methods: {

    filterEvents() {

      let str1, str2, str3

      if (this.selCountries.length < 1) str1 = this.countryList
      else str1 = this.selCountries
      if (this.selInstigators.length < 1) str2 = this.instigatorList
      else str2 = this.selInstigators
      if (this.selTargets.length < 1) str3 = this.targetList
      else str3 = this.selTargets

      //TODO: add filter for date from timeline
      var data = conflictData,
          filterBy = { COUNTRY: str1, ACTOR1: str2, TARGET1: str3},
          result = data.filter(object => Object.keys(filterBy).every(key => filterBy[key].some(filter => object[key] === filter)));

      //Filtered USD database entries
      console.log(result);
    },

    formatIDfilter(ids) {
      let str = ""
      if(ids !== undefined && ids.length > 0) {
        str += "&&appln_id=in.("
        ids.forEach((id, idx) => {
          str += id
          if (idx !== ids.length -1) str += ","
        })
        str += ")"
      }
      return str
    },

    sendRequest: async function(req) {
      console.log("FETCHING")
      return axios.get(req)
          .then(response => {
                console.log("Fetched " + response.data.length)
                //response.data.forEach((type) => {this.responseIDs.push(type.appln_id)})
                return response.data
              }
          )
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error)
          })
    },
  }
}
</script>

<style scoped>

</style>



//working test queries for sanity check.
//http://84.252.122.16:3000/tls209?ipc_class_symbol=like.F*&&limit=600


//http://84.252.122.16:3000/tls209?ipc_class_symbol=like.A*&&limit=600
//http://84.252.122.16:3000/tls209?ipc_class_symbol=in.(E06B   3/70,F16H  37/12)*&&limit=600
//http://84.252.122.16:3000/tls209?ipc_class_symbol=in.(E06B   3/70,F16H  37/12)&&and=(ipc_position.eq.F)&&limit=600


//http://84.252.122.16:3000/tls209?or=(ipc_class_symbol.like.A*, ipc_class_symbol.like.B*))&&ipc_position=in.(F)&&limit=600