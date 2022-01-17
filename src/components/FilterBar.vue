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
      this.filterEvents()
    })
    bus.$on('change', (from, to) => {
      this.dateTo = to
      this.dateFrom = from
      this.filterEvents()
    })
    bus.$on('selected-types', (selSections) => {
      this.selSections = selSections
    })
    bus.$on('selected-instigagors', (selInstigators) => {
      this.selInstigators = selInstigators
      this.filterEvents()
    })
    bus.$on('selected-targets', (selTargets) => {
      this.selTargets = selTargets
      this.filterEvents()
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
    dateFrom: "1960-1-1",
    dateTo: "2016-12-31",
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
        //TODO: when Server is up for testing, try range operator instead on date filter
        this.request = this.baseUrl + this.geoc + this.citySearchStr + "&&limit=2000" + "&&filing_date=lte." + this.dateTo + "&&filing_date=gte." + this.dateFrom
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
      //TODO: when Server is up, test date range
      this.request = this.baseUrl + this.geoc+ this.citySearchStr + this.typeSearchStr + "&&limit=2000" + "&&filing_date=lte." + this.dateTo + "&&filing_date=gte." + this.dateFrom

     console.log("Request is: "  + this.request)

      //Send request and save filtered IDS for further filtering
      this.sendRequest(this.request).then((response) => {
        if (response !== undefined) {

          response.forEach((id) => {this.countryFilterIDs.push(id.appln_id)})

          //emit filtered Patents
          bus.$emit('filtered-Patent-IDs', this.countryFilterIDs)
        }
      })
    },

    selSections: async function () {

      //Prepare request string
      this.typeSearchStr = ""
      this.sectionFilterIDs = []

      if (this.selSections.length === 0) {
        this.request = this.baseUrl + this.tls + "&&limit=200"//   + "&&filing_date=lte." + this.dateTo + "&&filing_date=gte." + this.dateFrom
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
        this.request = this.baseUrl + this.tls + this.typeSearchStr + "&&limit=2000" // + "&&filing_date=lte." + this.dateTo + "&&filing_date=gte." + this.dateFrom

        //console.log("Request is: "  + this.request)
      }

      //Send request and save filtered IDS for further filtering
      this.sendRequest(this.request).then((response) => {
        if (response !== undefined) {

          response.forEach((type) => {
            this.sectionFilterIDs.push(type.appln_id)
          })

          //emit filtered Patents
          bus.$emit('filtered-Patent-IDs', this.sectionFilterIDs)
        }
      })
    },
},

  methods: {

    filterEvents() {

      //Prepare filter values
      let str1, str2, str3
      let fromDate = new Date(this.dateFrom)
      let toDate = new Date(this.dateTo)

      if (this.selCountries.length < 1) str1 = this.countryList
      else str1 = this.selCountries
      if (this.selInstigators.length < 1) str2 = this.instigatorList
      else str2 = this.selInstigators
      if (this.selTargets.length < 1) str3 = this.targetList
      else str3 = this.selTargets

      //filter USD Database
      let data = conflictData,
          filterBy = { COUNTRY: str1, ACTOR1: str2, TARGET1: str3},
          result = data.filter(object => Object.keys(filterBy).every(key => filterBy[key].some(filter => object[key] === filter)));

      //TODO: solve this in a more elegant way if possible.
      //TODO: Fix Bug
      let filteredUSD = result.filter(function (event) {
        return event.BYEAR >= fromDate.getFullYear() && !(event.BYEAR > toDate.getFullYear());
      });

      console.log("USD has " + filteredUSD.length + " matches");
      console.log(filteredUSD[0])
      console.log(filteredUSD[filteredUSD.length-1])


      //Emit Filtered USD database entries
      bus.$emit('filtered-USD', filteredUSD)
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
