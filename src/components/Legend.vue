<template>
  <div>
    <v-subheader>LEGEND</v-subheader>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card dark color="info">
            <v-card-subtitle v-text="card.title"></v-card-subtitle>
            <v-divider></v-divider>
            <v-container v-if="card.title == 'Point layers'">
              <v-row dense v-for="l in pointLayer" :key="l.text">
                <v-card-actions>
                  <v-icon x-small :color="l.color">{{l.icon}}</v-icon>
                  <v-btn color="white lighten-2" text v-text="l.text" height="10px"> </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
            <v-container v-if="card.title == 'Country layers'">
              <v-row dense v-for="l in countryLayer" :key="l.text">
                <v-card-actions>
                  <v-icon x-small :color="l.color">{{l.icon}}</v-icon>
                  <v-btn color="white lighten-2" text v-text="l.text" height="10px"> </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
            <v-container v-if="card.title == 'Cluster layers'">
              <v-row dense v-for="l in clusterLayer" :key="l.text">
                <v-card-actions>
                  <v-icon x-small :color="l.color">{{l.icon}}</v-icon>
                  <v-btn color="white lighten-2" text v-text="l.text" height="10px"> </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Legend",
  data: () => ({
    selectedItem: 1,
    cards: [
      { title: 'Point layers', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
      { title: 'Country layers', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 4 },
      { title: 'Cluster layers', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 4 },
    ],
    pointLayer: [
      { text: 'Battles', icon: 'mdi-checkbox-blank-circle', color: '#ffdc51' },
      { text: 'Violence against civilians', icon: 'mdi-checkbox-blank-circle', color: '#5c90b1' },
      { text: 'Explosions/Remote violence', icon: 'mdi-checkbox-blank-circle', color: '#d27675' },
      { text: 'Riots', icon: 'mdi-checkbox-blank-circle', color: '#cb7b38' },
      { text: 'Protests', icon: 'mdi-checkbox-blank-circle', color: '#334f60' },
      { text: 'Strategic developments', icon: 'mdi-checkbox-blank-circle', color: '#334f60' },
      { text: 'Multiple event types', icon: 'mdi-checkbox-blank-circle', color: '#7c7c7c' },
    ],
    // color scheme country layer ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15']
    countryLayer: [
      { text: 'from 1 to 50 events', icon: 'mdi-square', color: '#fee5d9' },
      { text: 'from 51 to 100 events', icon: 'mdi-square', color: '#fcbba1' },
      { text: 'from 101 to 200 events', icon: 'mdi-square', color: '#fc9272' },
      { text: 'from 201 to 300 events', icon: 'mdi-square', color: '#fb6a4a' },
      { text: 'from 301 to 400 events', icon: 'mdi-square', color: '#de2d26' },
      { text: 'over 400 events', icon: 'mdi-square', color: '#a50f15' },
    ],
    clusterLayer: [
      { text: 'F41 - Weapons', icon: 'mdi-hexagon', color: '#9ff1bf' },
      { text: 'A61 - Medical or veterinary science; hygiene', icon: 'mdi-hexagon', color: '#f0f3a6' },
    ],
  }),
}
</script>

<style scoped>

</style>