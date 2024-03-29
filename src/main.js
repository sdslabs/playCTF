import Vue from "vue";
import App from "./App.vue";
import router from "./router";
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
import { CONFIG } from "@/config/config";
import Logo from "./assets/main-logo.svg";
import VueToastify from "vue-toastify";
import configureService from "./api/admin/configureAPI";

Vue.use(VueToastify, {
  position: "top-center",
  canTimeout: true,
  errorDuration: 3000,
  successDuration: 3000,
  warningInfoDuration: 3000,
  theme: "light"
});
Vue.config.productionTip = false;
Vue.use(VueConfirmDialog);
Vue.component("default-layout", DefaultLayout);
Vue.component("user-layout", UserLayout);
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
    },
    getLogoUrl() {
      let logoName = store.state.competitionInfo.logo;
      if (!logoName) {
        return Logo;
      }
      return `${CONFIG.beastRoot}/api/info/logo/${logoName}`;
    }
  }
});

async function init() {
  const response = await configureService.getConfigs();
  let configs = response.data;
  let competitionInfo = {
    name: configs.name,
    about: configs.about,
    prizes: configs.prizes,
    timezone: configs.timezone,
    startingTime: configs.starting_time,
    endingTime: configs.ending_time,
    logo: configs.logo_url
  };
  store.commit("updateCompInfo", competitionInfo);
}

init().then(() => {
  new Vue({
    router,
    store,
    components: {
      ChartJsPluginDataLabels
    },
    render: h => h(App)
  }).$mount("#app");
});
