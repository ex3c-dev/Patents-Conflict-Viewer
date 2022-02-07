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
                v-model="patentLayerSwitch"
                label="Patent Layer"
                color="primary"
                hide-details
            ></v-switch>
            <v-switch
                v-model="eventLayerSwitch"
                label="Event Layer"
                color="primary"
                hide-details
            ></v-switch>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-if="patentLayerSwitch">
      <vl-feature
          v-for="cluster in clusters"
          :key="cluster.id"
          :id="cluster.id"
          :properties="{type: 'patent', data: cluster}">
        <vl-geom-circle :coordinates="[cluster.lng, cluster.lat]" :radius="10000" ></vl-geom-circle>
      </vl-feature>
    </div>
    <div v-if="eventLayerSwitch">
      <vl-feature
          v-for="event in events"
          :key="event.EVENTID"
          :id="event.EVENTID"
          :properties="{type: 'event', event: event}">
        <vl-geom-point
            :coordinates="[parseFloat(event.spreadLONG), parseFloat(event.spreadLAT)]">
        </vl-geom-point>
        <vl-style-box>
          <vl-style-circle :radius="5">
            <vl-style-fill color="#640f12"></vl-style-fill>
            <vl-style-stroke color="#3b0e0f"></vl-style-stroke>
          </vl-style-circle>
        </vl-style-box>
      </vl-feature>
    </div>
  </div>
</template>

<script>
import {bus} from "@/main";

export default {
  name: "EventAndPatentLayer",
  data(){
    return {
      clusters: [],
      events: [],
      patentLayerSwitch: false,
      eventLayerSwitch: false,
    }
  },
  methods: {
    spreadPoints(conflictPoints) {
      let spreadPointList = [];
      conflictPoints.forEach((conflictPoint) => {
        let spreadLong = parseFloat(conflictPoint.LONG) + ((Math.random() * 2) - 1);
        let spreadLat = parseFloat(conflictPoint.LAT) + ((Math.random() * 2) - 1);
        conflictPoint.spreadLONG = spreadLong;
        conflictPoint.spreadLAT = spreadLat;
        spreadPointList.push(conflictPoint);
      });
      return spreadPointList;
    }
  },
  created() {
    bus.$on('filtered-patents', (data) => {
      this.clusters = data;
    });

    bus.$on('filtered-USD', (data) => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      const conflictPointNum = data.length / 10;
      this.events = this.spreadPoints(shuffled.slice(0, conflictPointNum));
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