import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let store = () => new Vuex.Store({
  state: {
    token: '',
    wxUser: null
  },
  mutations: {
    set_wxUser(state, wxUser) {
      state.wxUser = wxUser
    }
  },
  actions: {
   
  }
})

export default store