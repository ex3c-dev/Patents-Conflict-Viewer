<template><div class="patent-type-input">

  <v-autocomplete
      v-model="InstigatorTypes"
      :items="InstigatorList"
      label="Choose as many types as you want"
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

//import axios from "axios";
import conflictData from "../USD_data.json";
import {bus} from "@/main";



export default {
  name: "ConflictTypeFilter",

  props: ['test'],

  data() {
    return {
      baseUrl: "http://84.252.122.16:3000/tls209?",
      request: "",
      InstigatorList: conflictData,
      InstigatorTypes: [],
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