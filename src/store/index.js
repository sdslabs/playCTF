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
    competitionInfo: {
      competitionName: "",
      communicationPlatformLink: "",
      startingTime: "May 3, 2020 15:37:25",
      endingTime: "May 5, 2020 15:37:25",
      logo: ""
    },
    hostUrl: "http://878f93e6ce47.ngrok.io",
  },
  mutations: {
    updateCurrentPage(state, page) {
      state.currentPage = page;
    }
  },
  getters: {
    login: state => state.login,
    currentPage: state => state.currentPage,
    hostUrl: state => state.hostUrl,
  }
});
