<template>
  <div>
    <vl-overlay
        v-for="patentChart in patentChartList"
        :position="patentChart.coordinates"
        positioning="center-center"
        :key="patentChart.name"
        :id="patentChart.name">
      <template>
        <div style="width:100px; height:100px">
            <v-chart
                :option="patentChart.options">
            </v-chart>
        </div>
      </template>
    </vl-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  PieChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent
]);
import {bus} from "@/main";
import centralPoints from "../countries.json";
import VueLayers from "vuelayers";
import Overlay from "vuelayers";
import countryList from "../countryList.json"
import helper from "../Helper.ts"

Vue.use(VueLayers)
Vue.use(Overlay)
Vue.use(ECharts)
Vue.component('v-chart', ECharts)

export default {
  name: "Charts",
  components: {},
  data() {
    return {
      centralPointsList: centralPoints,
      patentData: [],
      selectedCountries: [],
      selSections: [],
      selTypes: [],
      loading: false,
      patentChartList: [],
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
          if(sumMax < 1000) {
            chartSize = "40%"
          } else if (sumMax < 10000) {
            chartSize = "50%"
          } else if (sumMax < 100000) {
            chartSize = "60%"
          } else if (sumMax < 300000) {
            chartSize = "70%"
          } else {
            chartSize = "80%"
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
            centralPoint = [actualCountry.longitude, actualCountry.latitude];
            let patentChart = {name: country, coordinates: centralPoint, options: {
              title: {
                text: sumMax,
                left: 'center',
                top: 20,
                textStyle: {
                  color: '#000',
                  textBorderWidth: 1,
                  textBorderType: 'solid',
                  textBorderColor: '#fff',
                  fontSize: 10
                }
              },
              tooltip: {
                trigger: 'item'
              },
              series: [
              {
                type: 'pie',
                stillShowZeroSum: false,
                label: {
                  show: false
                },
                data: [
                  {
                    value: aCounter,
                    name: 'A: Human Necessities'
                  },
                  {
                    value: bCounter,
                    name: 'B: Transporting / Performing Operations'
                  },
                  {
                    value: cCounter,
                    name: 'C: Chemistry / Metallurgy'
                  },
                  {
                    value: dCounter,
                    name: 'D: Textiles / Paper'
                  },
                  {
                    value: eCounter,
                    name: 'E: Fixed Constructions'
                  },
                  {
                    value: fCounter,
                    name: 'F: Mechanical Engineering / Lighting / Heating / Weapons / Blasting / Engines or Pumps'
                  },
                  {
                    value: gCounter,
                    name: 'G: Physics'
                  },
                  {
                    value: hCounter,
                    name: 'H: Electricity'
                  },
                  {
                    value: undefinedTypes,
                    name: 'Undefined'
                  }
                ],
                radius: chartSize,
                color: ['#034874', '#045a8d', '#0570b0', '#3690c0',
                  '#74a9cf', '#a6bddb', '#d0d1e6', '#ece7f2',
                  '#868686']
              }
            ]}};
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


