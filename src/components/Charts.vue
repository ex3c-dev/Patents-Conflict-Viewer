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

    <!--
    <template>
      <div>
        <vl-feature
            v-for="patentCircle in emptyPatentList"
            :key="patentCircle.id"
            :id="patentCircle.id">
          <vl-geom-circle :coordinates="patentCircle.coordinates" :radius="10000"></vl-geom-circle>
        </vl-feature>
      </div>
    </template>
    -->



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
      sumTitle: "",
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
          text: this.sumTitle,
          align: 'center',
          style: {
            fontSize:  '20px',
            color: '#E91E63',
          },
        },
        legend: {
          show: false
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#164659',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        },
        labels: ["A: Human Necessities", "B: Transporting / Performing Operations",
          "C: Chemistry / Metallurgy", "D: Textiles / Paper", "E: Fixed Constructions",
          "F: Mechanical Engineering / Lighting / Heating / Weapons / Blasting / Engines or Pumps", "G: Physics",
          "H: Electricity", "Undefined"],
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

      this.maxPatentList = maxValues.entries();

      console.log(maxValues);


      //console.log(this.maxPatentList);

      if (this.selectedCountries.length === 0) {
        this.selectedCountries = countryList;
      }

      this.selectedCountries.forEach((country) => {

        let filteredPatentCountry = this.patentData.filter(patent => patent.name_0 === country);
        let sum = filteredPatentCountry.length;


        //let sumMax = this.maxPatentList[country];

        let chartSize;


        //console.log(sumMax);

        if(sum < 100) {
          chartSize = "50%"
        } else if (sum < 500) {
          chartSize = "60%"
        } else if (sum < 1000) {
          chartSize = "70%"
        } else if (sum < 1500) {
          chartSize = "80%"
        } else {
          chartSize = "100%"
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
          let patentChart = {name: country, coordinates: centralPoint, diameter: chartSize, series: series};
          //console.log(patentChart);
          if(sum > 0) {
            this.patentChartList.push(patentChart);
          } /*else {

            console.log("emptyPatent: " + country)

            let emptyPatentCircle = {name: country, coordinates: centralPoint};
            this.emptyPatentList.push(emptyPatentCircle)
          }*/
        }
      })
    }

  }

}
</script>

<style scoped>

</style>


