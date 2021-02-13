import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    token: null,
    login: false,
    access: false
  },
  mutations: {
    update(state, key) {
      state.token = key
      state.login = true
    },
    logout(state) {
      state.token = null
      state.login = false
      state.access = false
      sessionStorage.clear();
    },
    giveAccess(state) {
      state.access = true
    }
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getState: state => {
      return state.login
    },
    getAccess: state => {
      return state.access
    }
  }
})

export default store;