<template>
  <div id="app">
    <Map style="height: 80%; width: 80%" class="map-container"></Map>
    <div class="filter-container">
      <h3>Filter</h3>
    </div>
    <div class="legend">Legende</div>
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #EDEDED;
  position: absolute;
  height: 100%;
  width: 100%;
}

.filter-container{
  position: relative;
  display: inline-block;
  width: 20%;
  background-color: #39597D;
  float: right;
}

.map-container{
  position: relative;
  display: inline-block;
}

.legend{
  position: relative;
  width: 100%;
  min-height: 20%;
  background-color: #EDEDED;
  color: #5A6C76;
  transform: translateY(-4px);
}
</style>
