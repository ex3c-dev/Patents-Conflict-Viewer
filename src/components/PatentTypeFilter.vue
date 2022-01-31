<template><div class="patent-type-input">

  Patent Section
  <v-autocomplete
      class="filter"
      v-model="selSections"
      :items="groupList"
      label="Select patent section"
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
      label="Select patent class"
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
      label="Select patent subgroup"
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
    };
  },

  watch: {
    selSections: async function () {

      bus.$emit('selected-types', this.selSections)

    }
  },
}

</script>

<style scoped>

.filter{
  transform: translateY(20px);
}

</style>