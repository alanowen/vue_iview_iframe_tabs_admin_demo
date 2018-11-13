import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

import App from './App.vue'
import router from './router'
import store from './store'
import '@assets/style/base.css'

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})