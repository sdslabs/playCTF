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
      startingTime: "23:07 UTC: +06:00, 9th February 2021, Tuesday",
      endingTime: "07:07 UTC: +06:00, 11th February 2021, Thursday",
      logo: ""
    },
    hostUrl: "http://localhost:5005",
    challengeHostUrl: "http://challenges.beast.com"
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
    challengeHostUrl: state => state.challengeHostUrl
  }
});
