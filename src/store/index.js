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
      name: "",
      about: "",
      prizes: "",
      startingTime: "",
      endingTime: "",
      timezone: "",
      logo: ""
    },
    hostUrl: "http://localhost:5005"
  },
  mutations: {
    updateCurrentPage(state, page) {
      state.currentPage = page;
    },
    updateUserAuth(state, { username, token, role }) {
      state.userInfo.userName = username;
      state.userInfo.token = token;
      state.userInfo.login = true;
      state.userInfo.role = role;
      state.userInfo.access = true;
    },
    logout(state) {
      state.userInfo.userName = null;
      state.userInfo.token = null;
      state.userInfo.login = false;
      state.userInfo.access = false;
      state.userInfo.role = null;
      sessionStorage.clear();
    },
    updateCompInfo(state, configs) {
      state.competitionInfo = configs;
    }
  },
  getters: {
    login: state => state.userInfo.login,
    currentPage: state => state.currentPage,
    hostUrl: state => state.hostUrl,
    getUsername: state => {
      return state.userInfo.userName;
    },
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
