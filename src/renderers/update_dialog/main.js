import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

import App from './App.vue'
import '@assets/style/base.css'


new Vue({
    el: '#app',
    render: h => h(App)
})