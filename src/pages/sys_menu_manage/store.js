import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import api from './api'

export default new Vuex.Store({

    state: {
        sysMenuList: []
    },

    mutations: {

    },

    actions: {
        getSysMenuList({ state }) {
            return api.getSysMenuList().then(response => {
                state.sysMenuList = response.data
            })
        }
    },

    getters: {
        getMenuByName: state => name => {
            let menu = state.sysMenuList.find(i => i.menuName == name)
            if (menu) {
                return Object.assign({}, menu)
            } else {
                return menu
            }
        }
    }
})