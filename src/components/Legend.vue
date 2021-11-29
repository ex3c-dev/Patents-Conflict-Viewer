<template>
  <div>
      <v-subheader>LEGEND</v-subheader>
  </div>
</template>

<script>
export default {
  name: "Legend",
  data: () => ({
    selectedItem: 1,
    pointLayer: [
      { text: 'Battles', icon: 'mdi-clock' },
      { text: 'Violence against civilians', icon: 'mdi-clock' },
      { text: 'Explosions/Remote violence', icon: 'mdi-clock' },
      { text: 'Riots', icon: 'mdi-clock' },
      { text: 'Protests', icon: 'mdi-clock' },
      { text: 'Strategic developments', icon: 'mdi-clock' },
      { text: 'Multiple event types', icon: 'mdi-clock' },
    ],
  }),
}
</script>

<style scoped>

</style>