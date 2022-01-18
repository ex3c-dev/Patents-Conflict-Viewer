<template>
  <div>
    <vl-layer-vector>
      <vl-feature
          v-for="feature in features"
          :key="feature.id"
          :id="feature.id">
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
import {bus} from "../main";

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
      loading: false,
    }
  },
  created() {
    bus.$on('filtered-USD', (data) => {
      this.conflictList = data;
    });
  },
  methods: {

    genCountryList() {
      let list = [];
      this.conflictList.forEach((conflict) => {
        let conflictCountry = conflict.COUNTRY;
        if (!list.includes(conflictCountry)) {
          list.push(conflictCountry);
        }
      });
      return list;
    },

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

    colorCountry(numbEvents) {
      if(numbEvents > 400) {
        return "rgba(165,15,21,0.8)";
      } else if(numbEvents > 300) {
        return "rgba(222,45,38,0.8)";
      } else if(numbEvents > 200) {
        return "rgba(251,106,74,0.9)";
      } else if(numbEvents > 100) {
        return "rgba(252,146,114,0.8)";
      } else if(numbEvents > 50) {
        return "rgba(252,187,161,0.8)";
      } else if(numbEvents > 0) {
        return "rgba(254,229,217,0.9)";
      }
    },

    parsePolygon(feature) {
      let coordinates = feature.geometry.coordinates;
      feature.geometry.type = "MultiPolygon";
      feature.geometry.coordinates = [coordinates];
      return feature;
    },

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