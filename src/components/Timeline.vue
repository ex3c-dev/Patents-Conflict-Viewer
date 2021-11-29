<template>
  <div id="app">
    <HistogramSlider

        :bar-height="50"
        :bar-width="3"
        :barRadius="3"
        :data="data"
        :prettify="prettify"
        :drag-interval="true"
        :force-edges="false"
        :keyboard="true"
        :colors="['#FF4B24', '#FF7424']"
        :primaryColor="'#FF4B24'"
        :handleColor="'#FF4B24'"
        :holderColor="'black'"
        :gridTextColor="'black'"
        :min="new Date(2004, 11, 24).valueOf()"
        :max="new Date(2018, 11, 24).valueOf()"
    />
  </div>
</template>

<script>
import HistogramSlider from "vue-histogram-slider";
import "vue-histogram-slider/dist/histogram-slider.css";
import data from "../data.json";

export default {
name: "Timeline",
  components: {
  HistogramSlider,
  },
    data() {
    return {
      data: data.map(d => new Date(d)),
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString("en", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    };
  }
}

</script>

<style scoped>

</style>