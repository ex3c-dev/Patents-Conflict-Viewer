<template>
  <!-- Generates a legend container -->
  <v-container fluid>
    <v-card dark color="primary" class="overflow-x-hidden">
      <v-card-subtitle>Cluster patent Layer</v-card-subtitle>
      <v-divider/>
      <v-container>
        <v-row
            v-for="layer in pointLayer"
            :key="layer.ID"
            :id="layer.ID"
            dense>
          <v-card-actions>
            <v-icon x-small :color="layer.Color">mdi-hexagon</v-icon>
            <v-btn color="white lighten-2" class="card-item" text v-text="layer.Text" height="10px"></v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
//import {bus} from "@/main";
import {uuid} from 'vue-uuid'
export default {
  name: "LegendClusterLayer",
  data() {
    return {
      pointLayer: [
        {"ID": uuid.v1(), "Events": 400, "Color": this.randomColor(), "Text": "F41 - Weapons"},
        {"ID": uuid.v1(), "Events": 400, "Color": this.randomColor(), "Text": "A61 - Medical or veterinary science; hygiene"}
      ]
    }
  },
  methods: {
    /**
     * Generates a random rgb string for usage in css
     * @returns {string}
     */
    randomColor(){
      return 'rgb(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ')';
    }
  }
}
</script>

<style scoped>
.card-item {
  overflow: hidden;
}

</style>