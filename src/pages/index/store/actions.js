import axios from 'axios'

import api from '../api'


export default {
    getSysInitData(context) {
        let promise = new Promise((resolve, reject) => {
            axios.all([api.getSysMenuList(), api.getSysPrivList()]).then(axios.spread((rep1, rep2) => {
                context.commit('menuList', rep1.data)
                context.commit('privList', rep2.data)
                resolve()
            })).catch(error => {
                reject(error)
            })
        })
        return promise
    },

    login(context) {
        let promise = new Promise((resolve, reject) => {
            api.login().then(response => {
                if (response.status == 200) {
                    let { token, user } = response.data
                    context.commit('token', token)
                    context.commit('currentUser', user)
                    resolve(response.data)
                } else {
                    reject(new Error(response));
                }

            }).catch(error => {
                reject(error)
            })
        })
        return promise
    },

    logout({ state }) {
        state.token = null
        state.currentUser.userName = null
        state.currentUser.userType = null
        state.currentUser.userId = null
        
        window.sessionStorage.removeItem('token')
    },

    // 打开tab
    openTab({ state, commit, rootState }, name) {
        let tab = undefined, index = state.tabs.findIndex(i => i.name == name);
        if (index == -1) {

            let menu = null
            for (let i of state.menuList.values()) {
                if (i.menuName == name) {
                    menu = i
                    break
                } else if (Reflect.has(i, 'children')) {
                    for (let j of i.children.values()) {
                        if (j.menuName == name) {
                            menu = j
                            break
                        }
                    }
                }
            }
            state.tabs.push({
                name,
                url: menu.menuUrl,
                label: menu.menuLabel,
                mount: true
            })
        } else {
            tab = state.tabs[index]
            if (tab.mount == false) {
                tab.mount = true
                state.tabs.splice(index, 1)
                state.tabs.push(tab)
            }
        }
        state.currentMenu = name
    },

    // 关闭tab
    closeTab({ state, commit }, name) {
        let mounted = state.tabs.filter(i => i.mount == true)
        let index = mounted.findIndex(i => i.name == name)
        mounted[index].mount = false

        let nextMenu = null

        if (name == state.currentMenu) {
            if (index == 0) {
                let t = mounted[index + 1]
                if (t != undefined) {
                    nextMenu = t.name
                }
            } else if (index == mounted.length - 1) {
                let t = mounted[index - 1]
                if (t != undefined) {
                    nextMenu = t.name
                }
            } else {
                let t = mounted[index + 1]
                nextMenu = t.name
            }

            index = state.tabs.findIndex(i => i.name == name)
            state.tabs.splice(index, 1)

            state.currentMenu = nextMenu
        }
    }
}