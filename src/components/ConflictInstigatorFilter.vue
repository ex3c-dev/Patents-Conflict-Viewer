<template><div class="instigator-type-input">

  <v-autocomplete
      class="filter"
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

import conflictData from "../USD_data.json";
import {bus} from "@/main";

export default {
  name: "ConflictInstigatorFilter",

  created() {
    conflictData.forEach((event) => {this.InstigatorList.push(event.ACTOR1)})
  },

  data() {
    return {
      baseUrl: "http://84.252.122.16:3000/tls209?",
      request: "",
      InstigatorList: [],
      InstigatorTypes: [],
    };
  },

  watch: {
    /**
     * Sends event when user selects conflict instigator for filtering
     * @returns {Promise<void>}
     * @constructor
     */
    InstigatorTypes: async function () {

      bus.$emit('selected-instigagors', this.InstigatorTypes)
    }
  },
}
</script>

<style scoped>

.filter{
  transform: translateY(20px);
}

</style>