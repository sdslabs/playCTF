import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    update (state, key) {
      state.token = key
    }
  }
})

export default store;