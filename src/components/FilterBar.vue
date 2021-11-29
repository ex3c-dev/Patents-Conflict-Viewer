<template>
  <v-navigation-drawer dark color="primary" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Filter
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="([icon, text], i) in items" :key="i" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "FilterBar",
  data: () => ({
    items: [
      ['mdi-briefcase', 'Patent Type'],
      ['mdi-layers', 'Regions'],
      ['mdi-format-list-bulleted-type', 'Conflict Type'],
      ['mdi-human', 'Conflict Instigator'],
    ],
  }),
}
</script>

<style scoped>

</style>