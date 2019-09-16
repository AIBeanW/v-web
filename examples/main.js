import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import test from '~/index.js';
Vue.use(test)

Vue.use(test)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
