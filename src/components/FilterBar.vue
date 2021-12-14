<template>
  <v-navigation-drawer dark color="primary" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Filter
        </v-list-item-title>
        <TestComponent></TestComponent>

      </v-list-item-content>
    </v-list-item>

    <v-divider style="margin-top: 10px; margin-bottom: 10px;"></v-divider>

    <v-row justify="center" >
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="([icon, text, content], i) in items" :key="i">
          <v-expansion-panel-header dark color="primary">
            <v-row>
            <v-icon style="margin-left: 20px; margin-right: 20px;">{{icon}}</v-icon>
            {{text}}
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="secondary">
            <component v-bind:is="content"></component>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import TestComponent from "./TestComponent"; // needs css-loader
import PatentFilters from "@/components/PatentFilters";


export default {
  name: "FilterBar",
  components: {
    TestComponent,
    PatentFilters
  },
  data: () => ({
    items: [
      ['mdi-briefcase', 'Patent Type', PatentFilters],
      ['mdi-layers', 'Regions', TestComponent],
      ['mdi-format-list-bulleted-type', 'Conflict Type', TestComponent],
      ['mdi-human', 'Conflict Instigator', TestComponent],
    ],
  }),
}
</script>

<style scoped>

</style>