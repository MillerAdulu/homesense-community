import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    intrusions: []
  },
  getters: {
    intrusions: (state) => {
      const ints = state.intrusions.map((intru) => {
        intru.parsed = JSON.parse(intru.homesense)
        return intru
      })
      return ints
    }
  }
})
