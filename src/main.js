import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AdminLayout from "./layouts/Admin";
import DefaultLayout from "./layouts/Default";
import UserLayout from "./layouts/Users";
import AuthLayout from "./layouts/Auth";
import ErrorLayout from "./layouts/Error.vue";
import vSelect from "vue-select";
import "vue-select/src/scss/vue-select.scss";
import VuejsPaginate from "vuejs-paginate";
import store from "./store/index";
import VueConfirmDialog from "vue-confirm-dialog";
import Spinner from "vue-simple-spinner";
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels";
import AdminLandingLayout from "./layouts/AdminLanding.vue";
Vue.config.productionTip = false;
Vue.use(VueConfirmDialog);
Vue.component("default-layout", DefaultLayout);
Vue.component("admin-layout", AdminLayout);
Vue.component("user-layout",UserLayout);
Vue.component("auth-layout", AuthLayout);
Vue.component("error-layout", ErrorLayout);
Vue.component("admin-landing-layout", AdminLandingLayout);
Vue.component("v-select", vSelect);
Vue.component("paginate", VuejsPaginate);
Vue.component("vue-confirm-dialog", VueConfirmDialog.default);
Vue.component("loader", Spinner);
Vue.mixin({
  methods: {
    apiErrHandler: function(error) {
      console.log(error);
    },
    getImage(imagename) {
      return require(`../src/assets/${imagename}.svg`);
    }
  }
});
new Vue({
  router,
  store,
  components: {
    ChartJsPluginDataLabels
  },
  render: h => h(App)
}).$mount("#app");
