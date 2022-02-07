<template><div class="patent-type-input">

  Patent Section
  <v-autocomplete
      class="filter"
      v-model="selSections"
      :items="groupList"
      label="Filter by section"
      auto-select-first
      clearable
      deletable-chips
      dense
      multiple
      rounded
      small-chips
      solo
  ></v-autocomplete>

  Patent Class

  <v-autocomplete
      class="filter"
      v-model="selSections"
      :items="smallSectionList"
      label="Filter by class"
      auto-select-first
      clearable
      deletable-chips
      dense
      multiple
      rounded
      small-chips
      solo
  ></v-autocomplete>

  Patent subgroup

  <v-autocomplete
      class="filter"
      v-model="selSections"
      :items="sectionList"
      label="Filter by subgroup"
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

import types_short from "../types_short.json";
import typelist from "../types.json";
import typegroup from "../patentgroups.json";


import {bus} from "@/main";

export default {
  name: "PatentTypeFilter",

  data() {
    return {
      baseUrl: "http://84.252.122.16:3000/tls209?",
      request: "",
      sectionList: typelist,
      smallSectionList: types_short,
      groupList: typegroup,
      selSections: [],
      sectionCodes: []
    };
  },

  watch: {
    /**
     * Sends event when user selects patent types for filtering
     * @returns {Promise<void>}
     */
    selSections: async function () {
      this.sectionCodes = [];
      this.selSections.forEach(el => {
        let code = el.split(" -")
        this.sectionCodes.push(code[0])
        console.log(code[0])
      })

      bus.$emit('selected-types', this.sectionCodes)
    }
  },
}

</script>

<style scoped>

.filter{
  transform: translateY(20px);
}

</style>