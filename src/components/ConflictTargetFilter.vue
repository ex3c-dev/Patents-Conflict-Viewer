<template><div class="target-type-input">

  <v-autocomplete
      class="filter"
      v-model="TargetTypes"
      :items="TargetList"
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
  name: "ConflictTargetFilter",

  created() {

    conflictData.forEach((event) => {this.TargetList.push(event.TARGET1)})
    console.log(this.list)
  },

  data() {
    return {
      baseUrl: "http://84.252.122.16:3000/tls209?",
      request: "",
      TargetList: [],
      TargetTypes: [],
    };
  },

  watch: {
    TargetTypes: async function () {

      bus.$emit('selected-targets', this.TargetTypes)
      //console.log("Selected:" + this.TargetTypes)
    }
  },

}
</script>

<style scoped>

.filter{
  transform: translateY(20px);
}

</style>