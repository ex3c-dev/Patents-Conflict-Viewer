<template>
  <div>
    <!-- Generates a vector layer to display the country conflicts -->
    <vl-layer-vector>
      <vl-feature
          v-for="feature in features"
          :key="feature.id"
          :id="feature.id"
          :properties="{type: 'country', data: {}}">
        <vl-geom-multi-polygon :coordinates="feature.geometry.coordinates"></vl-geom-multi-polygon>
        <vl-style-box>
          <vl-style-stroke :color="feature.fillCol" :width="1"></vl-style-stroke>
          <vl-style-fill :color="feature.fillCol"></vl-style-fill>
        </vl-style-box>
      </vl-feature>
    </vl-layer-vector>
  </div>
</template>

<script>
import Vue from 'vue';
import VueLayers from 'vuelayers';
import FillStyle from 'vuelayers';
import world from 'world-atlas/countries-110m.json';
import {bus} from "@/main";
import {uuid} from "vue-uuid";

const topojson = require("topojson-client");

Vue.use(VueLayers)
Vue.use(FillStyle)


export default {
  name: "VectorMap",
  data () {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      features: [],
      conflictList: [],
      activeLayers: [],
      loading: false,
    }
  },
  created() {
    /**
     * Subscribes to the filtered-USD bus (filtered conflict data)
     */
    bus.$on('filtered-USD', (data) => {
      this.conflictList = data;
    });
  },
  methods: {

    /**
     * Generates a country list and returns it
     * @returns {*[]}
     */
    genCountryList() {
      let list = [];
      this.activeLayers = [];
      this.conflictList.forEach((conflict) => {
        let conflictCountry = conflict.COUNTRY;
        if (!list.includes(conflictCountry)) {
          list.push(conflictCountry);
        }
      });
      return list;
    },

    /**
     * Counts the events for a given country.
     * @param country Country to count the events.
     * @returns {number} Number of events the country has.
     */
    countEvents(country) {
      let eventCount = 0;
      this.conflictList.forEach((conflict) => {
        const conflictCountry = conflict.COUNTRY;
        if (conflictCountry === country){
          eventCount++;
        }
      });
      return eventCount;
    },

    /**
     * Colors the countries based on how many events it has.
     * @param numbEvents Number of conflicts
     * @returns {string} css rgba color string
     */
    colorCountry(numbEvents) {
      if(numbEvents > 400) {
        this.addLayer({"ID": uuid.v1(), "Events": 400, "Color": "rgba(165,15,21,0.8)", "Text": "OVER 400 EVENTS"});
        return "rgba(165,15,21,0.8)";
      } else if(numbEvents > 300) {
        this.addLayer({"ID": uuid.v1(), "Events": 300, "Color": "rgba(222,45,38,0.8)", "Text": "FROM 301 TO 400 EVENTS"});
        return "rgba(222,45,38,0.8)";
      } else if(numbEvents > 200) {
        this.addLayer({"ID": uuid.v1(), "Events": 200, "Color": "rgba(251,106,74,0.9)", "Text": "FROM 201 TO 300 EVENTS"});
        return "rgba(251,106,74,0.9)";
      } else if(numbEvents > 100) {
        this.addLayer({"ID": uuid.v1(), "Events": 100, "Color": "rgba(252,146,114,0.8)", "Text": "FROM 101 TO 200 EVENTS"});
        return "rgba(252,146,114,0.8)";
      } else if(numbEvents > 50) {
        this.addLayer({"ID": uuid.v1(), "Events": 50, "Color": "rgba(252,187,161,0.8)", "Text": "FROM 51 TO 100 EVENTS"});
        return "rgba(252,187,161,0.8)";
      } else if(numbEvents > 0) {
        this.addLayer({"ID": uuid.v1(), "Events": 0, "Color": "rgba(254,229,217,0.9)", "Text": "FROM 1 TO 50 EVENTS"});
        return "rgba(254,229,217,0.9)";
      }
    },

    /**
     * Pushes the layer to the active layers array, used for display and building the legend
     * @param layer
     */
    addLayer(layer){
      var contains = false;
      this.activeLayers.forEach((lay) => {
        if(lay.Events === layer.Events){
          contains = true
        }
      })

      if(!contains){
        this.activeLayers.push(layer);
      }
    },

    /**
     * Parses a polygon for a given feature. Used to create the country overlay
     * @param feature
     * @returns {*}
     */
    parsePolygon(feature) {
      let coordinates = feature.geometry.coordinates;
      feature.geometry.type = "MultiPolygon";
      feature.geometry.coordinates = [coordinates];
      return feature;
    },

    /**
     * Loads the country features and renames a couple of countries (Difference in our patent and conflict db)
     * @returns {Promise<unknown>}
     */
    loadFeatures () {
      let countries = topojson.feature(world, world.objects.countries).features;
      const renameCountry = new Map([
        ["Dominican Republic", "Dominican Rep."],
        ["Congo, DRC", "Dem. Rep. Congo"],
        ["Cote d'Ivoire", "Côte d'Ivoire"]
      ]);
      let display_Countries = [];

      this.genCountryList().forEach((country_events) => {
        let num_events = this.countEvents(country_events);

        if (num_events > 0) {
          country_events = (renameCountry.get(country_events) || country_events);
          let country_geo = countries.find(elm => elm.properties.name === country_events);

          if (country_geo) {
            if (country_geo.geometry.type === "Polygon") {
              country_geo = this.parsePolygon(country_geo);
            }

            country_geo.fillCol = this.colorCountry(num_events);
            display_Countries.push(country_geo);
          }
        }
      });

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(display_Countries);
        }, 5000)
      })
    },
  },

  watch: {
    /**
     * Watcher for the activeLayers. Push changes in the activeLayer to the bus
     * @returns {Promise<void>}
     */
    activeLayers: async function () {
      bus.$emit("NumberOfEvents", this.activeLayers);
    },
    /**
     * Loads a feature if the conflictList changes.
     * @returns {Promise<void>}
     */
    conflictList: async function () {
      this.loading = true
      this.loadFeatures().then(features => {
        this.features = features.map(Object.freeze)
        this.loading = false
      })
    },
  }

}
</script>

<style scoped>

</style>