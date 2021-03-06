import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

import App from './App.vue'
import router from './router'
import store from  './store'
import '@assets/style/base.css'

if (window.sessionStorage.getItem('token')) {
    store.commit('token', window.sessionStorage.getItem('token'))
}

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})