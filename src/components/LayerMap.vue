<template>
  <div>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
            data-projection="EPSG:4326" style="height: 100%; width: 100%">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation">
        <vl-interaction-select v-if="drawType == null" :features.sync="selectedFeatures">
          <template>

            <vl-overlay
                v-for="feature in selectedFeatures"
                :key="feature.id"
                :id="feature.id"
                class="feature-popup"
                :position="pointOnSurface(feature.geometry)"
                :auto-pan="true"
                :auto-pan-animation="{duration: 300}">
              <template slot-scope="popup">
                <v-card class="mx-auto" max-width="344">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"/>
                  <v-card-title>Feature ID: {{feature.id}}</v-card-title>
                  <v-card-subtitle>Des is {{feature.id}}!</v-card-subtitle>
                  <v-card-actions>
                    <v-btn color="orange lighten-2" text>Explore</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="show = !show">
                      <v-icon>{{show ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>
                      <v-card-text>
                        Popup: {{popup}}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </template>
            </vl-overlay>
          </template>
        </vl-interaction-select>
      </vl-view>

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>
      <vl-feature
          v-for="cluster in clusters"
          :key="cluster.id"
          :id="cluster.id">
        <vl-geom-circle :coordinates="cluster.coordinates" :radius="cluster.radius" ></vl-geom-circle>
      </vl-feature>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
      <Timeline class="timeline"></Timeline>
      <VectorMap class="vectorMap"></VectorMap>
    </vl-map>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import Timeline from "./Timeline";
import VectorMap from "./VectorMap";
import {findPointOnSurface} from "vuelayers/lib/ol-ext"; // needs css-loader

Vue.use(VueLayers)

export default {
  name: "LayerMap",
  components: {
    Timeline,
    VectorMap
  },
  data () {
    return {
      zoom: 10,
      center: [11.576, 48.137],
      rotation: 0,
      geolocPosition: undefined,
      selectedFeatures: [],
      drawType: undefined,
      clusters: [
        {id: "München", coordinates: [11.576, 48.137], radius: 20000, description: ""},
        {id: "Köln",coordinates: [6.95, 50.93333], radius: 15000, description: ""}
      ]
    }
  },
  methods: {
    pointOnSurface: findPointOnSurface,
  }
}
</script>

<style lang="scss" scoped>
.timeline{
  position: absolute;
  margin: 33% ;
  margin-left: 30%;
}

.vectorMap{
  position: absolute;
}

.feature-popup {
  position: absolute;
  left: -50px;
  bottom: 12px;
  width: 20em;
  max-width: none;
  background-color: #142126;

  &:after, &:before {
    top: 100%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  &:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
}
</style>