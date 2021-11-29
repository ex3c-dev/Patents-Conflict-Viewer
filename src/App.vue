<template>

  <v-app>
    <v-app-bar app color="primaryDark" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>
        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100"/>
      </div>
    </v-app-bar>

    <v-main>
      <LayerMap class="map-container"></LayerMap>
      <FilterBar class="filter-container"></FilterBar>
      <Legend class="legend"></Legend>
    </v-main>

    <v-footer padless dark>
      <v-card-text clas s="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Julia Glöß, Johanna Carolina Gerhardt, Tobias Theus, Nina Wüst</strong>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
import LayerMap from "./components/LayerMap";
import FilterBar from "./components/FilterBar";
import Legend from "./components/Legend";

export default {
  name: 'App',

  components: {
    Legend,
    FilterBar,
    LayerMap,
  },

  data: () => ({
    //
  }),
};
</script>

<style>

.filter-container{
  position: relative;
  display: inline-block;
  width: 20%;
  min-width: 20%;
  float: right;
}

.map-container{
  position: relative;
  display: inline-block;
  height: 65%;
  min-height: 50%;
  width: 80%;
  float: left;
}

.legend{
  width: 80%;
  height: 35%;
  overflow: hidden;
}
</style>
