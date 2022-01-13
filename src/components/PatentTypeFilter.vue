<template><div class="patent-type-input">

  <v-autocomplete
      v-model="selSections"
      :items="sectionList"
      label="Type as many types as you want"
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

import axios from "axios";
import typelist from "../types.json";


export default {
  name: "PatentTypeFilter",

  data() {
    return {
      baseUrl: "http://84.252.122.16:3000/tls209?",
      request: "",
      sectionList: typelist,
      selSections: [],
    };
  },

  watch: {
    selSections: async function () {

      if (this.sectionList.length === 0) {
        this.typeSearchStr = ""
        this.request = this.baseUrl + this.typeSearchStr
      }

      else {
        this.typeSearchStr = "select=id&&"
        this.typeSearchStr += "or=(ipc_class_symbol.like." + this.selSections[0] + "*"
        this.selSections.forEach((type) => {this.typeSearchStr += (",ipc_class_symbol.like." + type + "*")})
        //TODO either page or remove hardcoded limit.
        this.typeSearchStr += (")&&limit=2000")
        this.request = this.baseUrl + this.typeSearchStr

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

}
</script>

<style scoped>

</style>