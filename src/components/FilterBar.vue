<template>
  <v-navigation-drawer dark color="primary" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Filter
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider style="margin-top: 10px; margin-bottom: 10px;"></v-divider>

    <v-row justify="center" >
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="([icon, text], i) in items" :key="i">
          <v-expansion-panel-header dark color="primary">
            <v-row>
            <v-icon style="margin-left: 20px; margin-right: 20px;">{{icon}}</v-icon>
            {{text}}
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
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