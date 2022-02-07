<template>
  <v-container fluid>
    <v-card dark color="primary">
      <v-card-subtitle>Histogram</v-card-subtitle>
      <v-divider/>
      <v-container>
        <v-row
            v-for="layer in timeline"
            :key="layer.ID"
            :id="layer.ID"
            dense>
          <v-card-actions>
            <v-icon x-medium :color="layer.Color">mdi-chart-bar</v-icon>
            <v-btn color="white lighten-2" text v-text="layer.Text" height="10px"></v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import {uuid} from 'vue-uuid'
export default {
  name: "HistogramLayer",
  data() {
    return {
      timeline: [
        {"ID": uuid.v1(), "Events": 400, "Color": "#000", "Text": "Line Height : Number of events"},
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