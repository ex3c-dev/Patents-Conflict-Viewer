<template>
  <!-- Generates a legend container -->
  <v-container fluid>
    <v-card dark color="primary">
      <v-card-subtitle>Country conflict Layer</v-card-subtitle>
      <v-divider/>
      <v-container>
        <v-row
            v-for="layer in countryLayer"
            :key="layer.ID"
            :id="layer.ID"
            dense>
          <v-card-actions>
            <v-icon x-small :color="layer.Color">mdi-square</v-icon>
            <v-btn color="white lighten-2" text v-text="layer.Text" height="10px"></v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import {bus} from "@/main";
import {uuid} from "vue-uuid";
export default {
  name: "LegendCountryLayer",
  data() {
    return {
      countryLayer: [
        {"ID": uuid.v1(), "Events": 400, "Color": "rgba(165,15,21,0.8)", "Text": "OVER 400 EVENTS"},
        {"ID": uuid.v1(), "Events": 300, "Color": "rgba(222,45,38,0.8)", "Text": "FROM 301 TO 400 EVENTS"},
        {"ID": uuid.v1(), "Events": 200, "Color": "rgba(251,106,74,0.9)", "Text": "FROM 201 TO 300 EVENTS"},
        {"ID": uuid.v1(), "Events": 100, "Color": "rgba(252,146,114,0.8)", "Text": "FROM 101 TO 200 EVENTS"},
        {"ID": uuid.v1(), "Events": 50, "Color": "rgba(252,187,161,0.8)", "Text": "FROM 51 TO 100 EVENTS"},
        {"ID": uuid.v1(), "Events": 0, "Color": "rgba(254,229,217,0.9)", "Text": "FROM 1 TO 50 EVENTS"}
      ]
    }
  },
  created() {
    /**
     * Subsribes to the NumberOfEvents bus and fills the country layer legend dynamically.
     * Gets the data from the VectorMap.vue component
     */
    bus.$on('NumberOfEvents', (data) => {
      this.countryLayer = data.slice();
      this.countryLayer.sort(function (a, b) {return a.Events - b.Events})
    });
  }
}
</script>

<style scoped>

</style>