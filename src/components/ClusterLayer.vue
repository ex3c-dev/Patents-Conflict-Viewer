<template>
  <div>
    <vl-feature
        v-for="cluster in clusters"
        :key="cluster.id"
        :id="cluster.id"
        :properties="{type: 'patent', data: cluster}">
      <vl-geom-circle :coordinates="[cluster.lng, cluster.lat]" :radius="10000" ></vl-geom-circle>
    </vl-feature>
  </div>
</template>

<script>
import {bus} from "@/main";

export default {
  name: "ClusterLayer",
  data(){
    return {
      clusters: []
    }
  },
  created() {
    bus.$on('filtered-patents', (data) => {
      this.clusters = data;
    });
  }


}
</script>

<style scoped>

</style>