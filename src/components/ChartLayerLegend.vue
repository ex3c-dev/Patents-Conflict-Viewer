<template>
  <v-container fluid>
    <v-card dark color="primary" class="overflow-x-hidden">
      <v-card-subtitle>Chart Layer</v-card-subtitle>
      <v-divider/>
      <v-container>
        <v-row
            v-for="layer in chartLayer"
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

import {uuid} from "vue-uuid";
export default {
  name: "ChartLayerLegend",
  data() {
    return {
      chartLayer: [
        { "ID": uuid.v1(), "Text": 'A: Human Necessities', "Color": '#023858' },
        { "ID": uuid.v1(), "Text": 'B: Transporting / Performing Operations', "Color": '#045a8d' },
        { "ID": uuid.v1(), "Text": 'C: Chemistry / Metallurgy', "Color": '#0570b0' },
        { "ID": uuid.v1(), "Text": 'D: Textiles / Paper',"Color": '#3690c0' },
        { "ID": uuid.v1(), "Text": 'E: Fixed Constructions', "Color": '#74a9cf' },
        { "ID": uuid.v1(), "Text": 'F: Mechanical Engineering / Lighting / Heating / Weapons / Blasting / Engines or Pumps', "Color": '#a6bddb' },
        { "ID": uuid.v1(), "Text": 'G: Physics',"Color": '#d0d1e6' },
        { "ID": uuid.v1(), "Text": 'H: Electricity', "Color": '#ece7f2'},
        { "ID": uuid.v1(), "Text": 'Undefined', "Color": '#868686' },
      ]
    }
  },

}
</script>

<style scoped>
.list {
  max-height: 200px;
}
.card-item {
  overflow: hidden;
}

</style>