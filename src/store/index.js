import Vue from 'vue'
import Vuex from 'vuex'
import currentUserState from './modules/currentUser'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    currentUserState
  }
})
