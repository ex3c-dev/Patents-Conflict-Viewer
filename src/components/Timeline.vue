<template>
  <div id="app">
    <HistogramSlider

        :bar-height="100"
        :bar-width="3"
        :barRadius="3"
        :data="data"
        :prettify="prettify"
        :drag-interval="true"
        :force-edges="false"
        :keyboard="true"
        :colors="['#000', '#000']"
        :primaryColor="'#FF4B24'"
        :handleColor="'#FF4B24'"
        :holderColor="'black'"
        :gridTextColor="'black'"
        :min="new Date(1960, 1, 1).valueOf()"
        :max="new Date(2014, 31, 12).valueOf()"
        :change = "true"
        @finish="sliderChanged"
    />
  </div>
</template>

<script>
import HistogramSlider from "vue-histogram-slider";
import "vue-histogram-slider/dist/histogram-slider.css";
import conflictData from "../USD_data.json";
import {bus} from "@/main";


export default {
name: "Timeline",

  components: {
    HistogramSlider,
  },

  created() {

    //Format data for timeline histogram
    let list =  []
    conflictData.forEach((event) => {
      let dateStr = event.BYEAR + "-" + event.BMONTH + "-" + event.BDAY + "T22:00:00.000Z"
      list.push(dateStr)
    })
    this.data =  list.map(d => new Date(d))
  },


  data() {
    return {
      data: [],
      startDate: "",
      endDate: "",
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString("en", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    };
  },

  methods: {

    sliderChanged(values){
      this.startDate= new Date(values.from)
      this.endDate = new Date(values.to)

      let startMonth = this.startDate.getMonth() + 1
      let endMonth = this.endDate.getMonth() + 1
      let startStr = this.startDate.getFullYear() + "-" + startMonth + "-" + this.startDate.getDate()
      let endStr = this.endDate.getFullYear() + "-" + endMonth  + "-" + this.endDate.getDate()

      bus.$emit('change',startStr, endStr)
    }
  }
}

</script>

<style scoped>

</style>