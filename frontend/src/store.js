import Vue from 'vue'
import Vuex from 'vuex'
import user from './store/modules/user'

import city from './store/modules/city'
import category from './store/modules/category'
import place from './store/modules/place'
import placeLevel from './store/modules/placeLevel'
import fileImage from './store/modules/fileImage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    city,
    category,
    place,
    placeLevel,
    fileImage
  },
  state: {
    identity: null
  },
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  },
  mutations: {
    setUser (state, user) {
      state.identity = user
    }
  }
})
