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
    userInfo: {
      userName: "",
      Score: "",
      token: null,
      login: false,
      access: false,
      role: null
    },
    competitionInfo: {
      competitionName: "",
      communicationPlatformLink: "",
      startingTime: "23:07:05 UTC: +06:00, 9th February 2021, Tuesday",
      endingTime: "07:07:00 UTC: +06:00, 18th February 2021, Thursday",
      logo: ""
    },
    hostUrl: "http://localhost:5005",
    challengeHostUrl: "http://challenges.beast.com"
  },
  mutations: {
    updateCurrentPage(state, page) {
      state.currentPage = page;
    },
    async updateUserAuth(state, key, role) {
      state.userInfo.token = key;
      state.userInfo.login = true;
      state.userInfo.role = role;
      state.userInfo.access = true;
    },
    logout(state) {
      state.userInfo.token = null;
      state.userInfo.login = false;
      state.userInfo.access = false;
      state.userInfo.role = null;
      sessionStorage.clear();
    }
  },
  getters: {
    login: state => state.userInfo.login,
    currentPage: state => state.currentPage,
    hostUrl: state => state.hostUrl,
    challengeHostUrl: state => state.challengeHostUrl,
    getToken: state => {
      return state.userInfo.token;
    },
    getState: state => {
      return state.userInfo.login;
    },
    getAccess: state => {
      return state.userInfo.access;
    },
    getRole: state => {
      return state.userInfo.role;
    }
  }
});
