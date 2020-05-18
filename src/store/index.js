import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: true,
    currentPage: "",
    userInfo: {
      userName: "",
      Score: ""
    },
    competitonInfo: {
      competitionName: "",
      communicationPlatformLink: "",
      startingTime: "May 3, 2020 15:37:25",
      endingTime: "May 5, 2020 15:37:25",
      logo: ""
    }
  },
  mutations: {
    updateCurrentPage(state, page) {
      state.currentPage = page;
    }
  },
  actions: {},
  modules: {},
  getters: {
    login: state => state.login,
    currentPage: state => state.currentPage
  }
});
