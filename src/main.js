import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AdminLayout from './layouts/Admin'
import DefaultLayout from './layouts/Default'
Vue.config.productionTip = false
Vue.component('default-layout', DefaultLayout)
Vue.component('admin-layout', AdminLayout)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
