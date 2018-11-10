import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

import App from './App.vue'
import router from './router'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})