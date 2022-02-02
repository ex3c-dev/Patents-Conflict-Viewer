<template>
  <div>
    <vl-overlay
        v-for="patentChart in patentChartList"
        :position="patentChart.coordinates"
        positioning="center-center"
        :key="patentChart.name"
        :id="patentChart.name">
      <!--<vl-view ident="view" :zoom.sync="zoom" :max-zoom="1"></vl-view>-->
      <template>
        <div>
          <apexchart
              type="pie"
              :height=patentChart.diameter
              :width=patentChart.diameter
              :options="chartOptions"
              :series="patentChart.series">
          </apexchart>
        </div>
      </template>
    </vl-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import {bus} from "@/main";
import centralPoints from "../countries.json";
import VueLayers from "vuelayers";
import Overlay from "vuelayers";
import countryList from "../countryList.json"
import helper from "../Helper.ts"

Vue.use(Overlay)

Vue.use(VueLayers)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)


export default {
  name: "Charts",
  components: {},
  data() {
    return {
      centralPointsList: centralPoints,
      emptyPatentList: [],
      title: "",
      mapValue: [],
      patentData: [],
      testData: new Map,
      selectedCountries: [],
      maxPatentList: [],
      patentChartList: [],
      chartOptions: {
        chart: {
          type: 'pie'
        },
        title: {
          text: "",
          align: 'center',
          style: {
            fontSize:  '20px',
            color: '#E91E63',
          },
        },
        legend: {
          show: false
        },
        stroke: {
          show: false
        },
        fill: {
          colors: ['#023858', '#045a8d', '#0570b0', '#3690c0',
            '#74a9cf', '#a6bddb', '#d0d1e6', '#ece7f2',
            '#868686']
        },

        /*
        theme: {
          monochrome: {
            enabled: true,
            color: '#164659',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        },*/
        labels: ["A: Human Necessities", "B: Transporting / Performing Operations",
          "C: Chemistry / Metallurgy", "D: Textiles / Paper", "E: Fixed Constructions",
          "F: Mechanical Engineering / Lighting / Heating / Weapons / Blasting / Engines or Pumps", "G: Physics",
          "H: Electricity", "Undefined"],
        colors: ['#023858', '#045a8d', '#0570b0', '#3690c0',
          '#74a9cf', '#a6bddb', '#d0d1e6', '#ece7f2',
          '#868686']
      },
    }
  },
  created() {
    bus.$on('selected-countries', (selCountries) => {
      console.log(selCountries);
      this.selectedCountries = selCountries
    })
    bus.$on('filtered-map', (data) => {
      this.patentData = [];
      data.forEach((value) => {
        this.patentData.push(value);
      });
      console.log(this.patentData);
    })
  },
  watch: {
    patentData: async function () {
      this.generateCharts();
    }
  },
  methods: {
    /**
     * Function returning one patent chart for each country with different patent types
     */
    generateCharts() {
      console.log("Select Patents");
      this.patentChartList = [];
      let maxValues = helper.methods.getMax();
      console.log(maxValues)

      if (this.selectedCountries.length === 0) {
        this.selectedCountries = countryList;
      }

      this.selectedCountries.forEach((country) => {

        let filteredPatentCountry = this.patentData.filter(patent => patent.name_0 === country);
        //let sum = filteredPatentCountry.length;
        let sumMax = maxValues.get(country);

        //console.log("Country: " + country + "Sum:" + sumMax);
        let chartSize;


        //console.log(sumMax);

        if(sumMax < 100) {
          chartSize = "40%"
        } else if (sumMax < 1000) {
          chartSize = "45%"
        } else if (sumMax < 5000) {
          chartSize = "50%"
        } else if (sumMax < 10000) {
          chartSize = "55%"
        } else {
          chartSize = "70%"
        }

        //console.log("Country: " + country + " Amount: " + sum);

        let aCounter = 0;
        let bCounter = 0;
        let cCounter = 0;
        let dCounter = 0;
        let eCounter = 0;
        let fCounter = 0;
        let gCounter = 0;
        let hCounter = 0;
        let undefinedTypes = 0;
        let centralPoint = [];

        filteredPatentCountry.forEach((patentType) => {
          let patentTypeAr = patentType.patentType;
          if (patentTypeAr.length === 0) {
            undefinedTypes++;
            //console.log("Undefined");
          } else {
            patentTypeAr.forEach((patent) => {
              //console.log("Defined");
              if (patent.startsWith("A")) {
                aCounter++;
              } else if (patent.startsWith("B")) {
                bCounter++;
              } else if (patent.startsWith("C")) {
                cCounter++;
              } else if (patent.startsWith("D")) {
                dCounter++;
              } else if (patent.startsWith("E")) {
                eCounter++;
              } else if (patent.startsWith("F")) {
                fCounter++;
              } else if (patent.startsWith("G")) {
                gCounter++;
              } else if (patent.startsWith("H")) {
                hCounter++;
              } else {
                console.log("Nothing happened");
              }
            })
          }
        })

        let actualCountry = this.centralPointsList.find((centerCountry) => (centerCountry.name === country));
        //console.log(actualCountry);

        if (actualCountry) {
          centralPoint = [actualCountry.longitude, actualCountry.latitude]
          //let sumCounter = aCounter + bCounter + cCounter + dCounter + eCounter + fCounter + gCounter + hCounter;
          let series = [aCounter, bCounter, cCounter, dCounter, eCounter, fCounter, gCounter, hCounter, undefinedTypes];
          let patentChart = {name: country, coordinates: centralPoint, diameter: chartSize, series: series, chartTitle: sumMax};
          //console.log(patentChart);
          if(sumMax > 0) {
            //console.log("Country: " + country + " Sum: " + sumMax)
            this.patentChartList.push(patentChart);
          }
        }
      })
    }

  }

}
</script>

<style scoped>

</style>


