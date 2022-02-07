<template>
  <v-container fluid>
    <v-card dark color="primary">
      <v-card-subtitle>Point Layer</v-card-subtitle>
      <v-divider/>
      <v-container>
        <v-row
            v-for="layer in pointLayer"
            :key="layer.ID"
            :id="layer.ID"
            dense>
          <v-card-actions>
            <v-icon x-small :color="layer.Color">mdi-checkbox-blank-circle</v-icon>
            <v-btn color="white lighten-2" text v-text="layer.Text" height="10px"></v-btn>
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
  name: "LegendPointLayer",
  data() {
    return {
      pointLayer: [
        {"ID": uuid.v1(), "Events": 400, "Color": "#640f12", "Text": "Conflict events"},
        {"ID": uuid.v1(), "Events": 400, "Color": "#359acc", "Text": "Patents"},
      ]
    }
  },
  methods: {
    randomColor(){
      return 'rgb(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ')';
    }
  }
}
</script>

<style scoped>
.list {
  max-height: 200px;
}

</style>