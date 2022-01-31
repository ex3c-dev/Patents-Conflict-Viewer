<template>
  <div>
    <div class="LayerSettings">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header class="map-legend-header">
            Layer Settings
          </v-expansion-panel-header>
          <v-expansion-panel-content class="map-legend-content overflow-auto">
            <v-switch
                v-model="switch1"
                label="Deactivate Patent Layer"
                color="primary"
                hide-details
            ></v-switch>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-if="switch1">
      <vl-feature
          v-for="cluster in clusters"
          :key="cluster.id"
          :id="cluster.id"
          :properties="{type: 'patent', data: cluster}">
        <vl-geom-circle :coordinates="[cluster.lng, cluster.lat]" :radius="10000" ></vl-geom-circle>
      </vl-feature>
    </div>
  </div>
</template>

<script>
import {bus} from "@/main";

export default {
  name: "ClusterLayer",
  data(){
    return {
      clusters: [],
      switch1: false,
    }
  },
  created() {
    bus.$on('filtered-patents', (data) => {
      this.clusters = data;
    });
  }


}
</script>

<style scoped>
.LayerSettings{
  position: absolute;
  left: 0;
  width: 10%;
  margin-top: 5px;
  margin-left: 50px;
}

</style>