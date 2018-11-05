import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: "",
        isLogin: false
    },
    mutations: {
        setName(state, name) {
            state.isLogin = true
            state.name = name
        },
        clearName(state) {
            state.isLogin = false
            state.name = ""
        }
    },
    actions: {

    }
})