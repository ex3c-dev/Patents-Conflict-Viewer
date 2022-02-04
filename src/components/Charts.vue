<template>
  <div>
    <vl-overlay
        v-for="patentChart in patentChartList"
        :position="patentChart.coordinates"
        positioning="center-center"
        :key="patentChart.name"
        :id="patentChart.name">
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
      selSections: [],
      selTypes: [],
      loading: false,
      patentChartList: [],
      chartOptions: {
        chart: {
          type: 'pie',
          animations: {
            enabled: false
          }
        },
        title: {
          text: "",
          align: 'center',
          style: {
            fontSize: '20px',
            color: '#E91E63',
          },
        },
        legend: {
          show: false
        },
        stroke: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          colors: ['#023858', '#045a8d', '#0570b0', '#3690c0',
            '#74a9cf', '#a6bddb', '#d0d1e6', '#ece7f2',
            '#868686']
        },
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
  async created() {
    bus.$on('selected-countries', (selCountries) => {
      this.selectedCountries = selCountries
    })
    bus.$on('filtered-map', (data) => {
      this.patentData = [];
      data.forEach((value) => {
        this.patentData.push(value);
      });
    })
    bus.$on('selected-types', (selSections) => {
      this.selSections = selSections;
    })
  },
  watch: {
    patentData: async function () {
      this.patentChartList = [];
      this.selTypes = this.getMainTypes();
      this.loading = true;
      this.generateCharts().then(features => {
        this.patentChartList = features.map(Object.freeze);
        this.loading = false;
      });
    }
  },
  methods: {
    /**
     * Function returning one patent chart for each country with different patent types
     */
    generateCharts() {
      let display_Chart = [];
      let maxValues = helper.methods.getMax();

      if (this.selectedCountries.length === 0) {
        this.selectedCountries = countryList;
      }

      this.selectedCountries.forEach((country) => {
        if (this.patentData.find(patent => patent.name_0 === country)) {
          let filteredPatentCountry = this.patentData.filter(patent => patent.name_0 === country);
          let sumMax = maxValues.get(country);

          let chartSize;
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
            } else {
              patentTypeAr.forEach((patent) => {
                //console.log("Defined");
                if (patent.startsWith("A") && this.selTypes.includes('A')) {
                  aCounter++;
                } else if (patent.startsWith("B") && this.selTypes.includes('B')) {
                  bCounter++;
                } else if (patent.startsWith("C") && this.selTypes.includes('C')) {
                  cCounter++;
                } else if (patent.startsWith("D") && this.selTypes.includes('D')) {
                  dCounter++;
                } else if (patent.startsWith("E")  && this.selTypes.includes('E')) {
                  eCounter++;
                } else if (patent.startsWith("F")  && this.selTypes.includes('F')) {
                  fCounter++;
                } else if (patent.startsWith("G")  && this.selTypes.includes('G')) {
                  gCounter++;
                } else if (patent.startsWith("H")  && this.selTypes.includes('H')) {
                  hCounter++;
                }
              })
            }
          });

          let actualCountry = this.centralPointsList.find((centerCountry) => (centerCountry.name === country));
          if (actualCountry) {
            centralPoint = [actualCountry.longitude, actualCountry.latitude]
            let series = [aCounter, bCounter, cCounter, dCounter, eCounter, fCounter, gCounter, hCounter, undefinedTypes];
            let patentChart = {name: country, coordinates: centralPoint, diameter: chartSize, series: series, chartTitle: sumMax};
            display_Chart.push(patentChart);
          }
        }
      });

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(display_Chart);
        }, 5000)
      });
    },

    getMainTypes() {
      let mainTypes = [];
      if (this.selSections.length > 0) {
        this.selSections.forEach((patType) => {
          let mainPatType = patType.charAt(0);
          if(!mainTypes.includes(mainPatType)) {
            mainTypes.push(mainPatType);
          }
        });
      } else {
        mainTypes = ["A", "B", "C", "D", "F", "G", "H"];
      }

      return mainTypes;
    }

  }

}
</script>

<style scoped>

</style>


