import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: resolve => require(['./components/Index.vue'], resolve),
        },
        {
            path: '/edit',
            name: 'Edit',
            component: resolve => require(['./components/Edit.vue'], resolve)
        }
    ]
})