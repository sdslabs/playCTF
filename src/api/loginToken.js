import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    login: false,
    access: false
  },
  mutations: {
    update (state, key) {
      state.token = key
      state.login = true
    },
    logout (state) {
        state.token = null
        state.login = false
        state.access = false
    },
    giveAccess (state) {
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
    getRights: state => {
        return state.access
    }
  }
})

export default store;