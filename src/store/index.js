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
      startingTime: "Jan 12, 2021 15:37:25",
      endingTime: "Jan 14, 2021 15:37:25",
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
    challengeHostUrl: state => state.challengeHostUrl,
  }
});
