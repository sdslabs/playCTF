import Vue from "vue";
import App from "./App.vue";
import router from "./router";
<<<<<<< HEAD
import store from "./store";
import AdminLayout from "./layouts/Admin";
import DefaultLayout from "./layouts/Default";
import vSelect from "vue-select";
import "vue-select/src/scss/vue-select.scss";
import VuejsPaginate from "vuejs-paginate";
=======
import store from "./store/index";

>>>>>>> e4d9407494ab1014841a323c39cbf4dda697a63e
Vue.config.productionTip = false;
Vue.component("default-layout", DefaultLayout);
Vue.component("admin-layout", AdminLayout);
Vue.component("v-select", vSelect);
Vue.component("paginate", VuejsPaginate);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
