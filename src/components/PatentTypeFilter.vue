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

import typelist from "../types.json";
import {bus} from "@/main";



export default {
  name: "PatentTypeFilter",

  props: ['test'],

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

      bus.$emit('selected-types', this.selSections)

    }
  },

}
</script>

<style scoped>

</style>