import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: "",
        isLogin: false,
        typeId: "",
        noteId: ""
    },
    mutations: {
        setName(state, name) {
            state.isLogin = true
            state.name = name
        },
        clearName(state) {
            state.isLogin = false
            state.name = ""
        },
        setTypeId(state, typeId) {
            state.typeId = typeId || ""
        },
        setNoteId(state, noteId) {
            state.noteId = noteId || ""
        }
    },
    actions: {

    }
})