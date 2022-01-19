import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import UUID from 'vue-uuid'

Vue.config.productionTip = false

export const bus = new Vue();
Vue.use(UUID);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')



