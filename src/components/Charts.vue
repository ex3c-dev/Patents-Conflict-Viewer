<template>
  <div>
    <vl-overlay
        v-for="patentChart in patentChartList"
        :key="patentChart.name"
        :id="patentChart.name"
        class="chart-overlay"
        :position="patentChart.coordinates">
      <template>
        <div>
          <apexchart
              type="pie"
              :height="patentChart.diameter"
              :width="patentChart.diameter"
              :options="chartOptions"
              :series="patentChart.series">
          </apexchart>
        </div>
      </template>
    </vl-overlay>
  </div>
  <!--

        :stop-event="true"
        :auto-pan="true"
        :auto-pan-animation="{duration: 300}"

        :positioning="center-center"
:offset="[-100, -100]"
  <div>
    <vl-feature
        v-for="chart in charts"
        :key="chart.id"
        :id="chart.id"
        :position="chart.coordinates">
      <apexchart type="pie" :width="40" :options="chartOptions" :series="series">

      </apexchart>
    </vl-feature>
  </div> -->
</template>

<script>
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import {bus} from "@/main";
import centralPoints from "../centralpointscountries.json";

Vue.component('apexchart', VueApexCharts)


export default {
  name: "Charts",
  components: {
  },
  data() {
    return {
      zoom: 1,
      centralPointsList: centralPoints,
      chartCoordinates: [],
      patentData: [],
      selectedCountries: [],
      patentChartList: [],
      charts: [
        //{id: "München", coordinates: [11.576, 48.137], radius: 40000, description: ""},
        //{id: "Köln",coordinates: [6.95, 50.93333], radius: 15000, description: ""}
      ],
      chartOptions: {
        chart: {
          type: 'pie'
        },
        /*
        title: {
          text: 'Patent Types',
          align: 'center',
          style: {
            fontSize:  '20px',
            color: '#E91E63',
          },
        },*/
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
          "H: Electricity"],
      },
    }

  },
  created() {
    bus.$on('filtered-patents', (data) => {
      this.patentData = data;
      console.log(data[1]);
    });
    bus.$on('filtered-patents', (data) => {
      this.patentData = data;
      console.log(data[1]);
    });
    bus.$on('selected-countries', (selCountries) => {
      console.log(selCountries);
      this.selectedCountries = selCountries
    })
  },
  watch: {
    patentData: async function () {
      this.selectPatents()
      console.log(this.patentData);
    }
  },
  methods: {
    selectPatents() {
      console.log("selected country function");
      let patentCharts = [];

      this.selectedCountries.forEach((country) => {
        let filteredPatentCountry = this.patentData.filter(patent => patent.name_0 === country);
        console.log("Country: " + country);
        console.log(filteredPatentCountry);

        let aCounter = 0;
        let bCounter = 0;
        let cCounter = 0;
        let dCounter = 0;
        let eCounter = 0;
        let fCounter = 0;
        let gCounter = 0;
        let hCounter = 0;
        let centralPoint = [];

        filteredPatentCountry.forEach((patent) => {
          if (patent.type.startsWith("A")) {
            aCounter++;
          } else if (patent.type.startsWith("B")) {
            bCounter++;
          } else if (patent.type.startsWith("C")) {
            cCounter++;
          } else if (patent.type.startsWith("D")) {
            dCounter++;
          } else if (patent.type.startsWith("E")) {
            eCounter++;
          } else if (patent.type.startsWith("F")) {
            fCounter++;
          } else if (patent.type.startsWith("G")) {
            gCounter++;
          } else if (patent.type.startsWith("H")) {
            hCounter++;
          } else {
            console.log("Nothing happened");
          }
        })


        let actualCountry = this.centralPointsList.find((centerCountry) => {
          country === centerCountry.name
        })

        if (actualCountry) {
          centralPoint = [actualCountry.latitude, actualCountry.longitude]
          let sumCounter = aCounter + bCounter + cCounter + dCounter + eCounter + fCounter + gCounter + hCounter;
          let series = [aCounter, bCounter, cCounter, dCounter, eCounter, fCounter, gCounter, hCounter];
          let patentChart = {name: country, coordinates: [centralPoint], diameter: sumCounter, series: series}
          patentCharts.push(patentChart)
        }


        /*for (var i = 0; i < this.centralPointsList.length; i++) {
          if (this.centralPointsList.name === country) {
            centralPoint = [i.latitude, i.longitude]
            break;
          }
        }*/
      })
      this.patentChartList = patentCharts
    }
  }
}
</script>

<style scoped>

</style>