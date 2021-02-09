import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    login: false,
    admin: false
  },
  mutations: {
    update (state, key) {
      state.token = key
      state.login = true
    },
    logout (state) {
        state.token = null
        state.login = false
    },
    rights (state) {
        state.admin = true;
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
        return state.admin
    }
  }
})

export default store;