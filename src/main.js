import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AdminLayout from './layouts/Admin'
import DefaultLayout from './layouts/Default'
import vSelect from 'vue-select'
import 'vue-select/src/scss/vue-select.scss'
Vue.config.productionTip = false
Vue.component('default-layout', DefaultLayout)
Vue.component('admin-layout', AdminLayout)
Vue.component('v-select', vSelect)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
