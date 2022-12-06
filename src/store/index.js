import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    currentPage: "",
    competitionInfo: {
      name: "",
      about: "",
      prizes: "",
      startingTime: "",
      endingTime: "",
      timezone: "",
      logo: ""
    },
    theme: "light"
  },
  mutations: {
    updateCurrentPage(state, page) {
      state.currentPage = page;
    },
    updateCompInfo(state, configs) {
      state.competitionInfo = configs;
    },
    updateTheme(state, darkmode) {
      state.theme = darkmode ? "dark" : "light";
    }
  },
  getters: {
    currentPage: state => state.currentPage,
    hostUrl: state => state.hostUrl,
    theme: state => state.theme
  }
});
