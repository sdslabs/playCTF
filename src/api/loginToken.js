import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    update (state, key) {
      state.token = key
    },
    logout (state) {
        state.token = null
    }
  },
  getters: {
    getToken: state => {
        return state.token
    }
  }
})

export default store;