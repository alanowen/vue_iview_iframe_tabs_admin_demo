import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'

Vue.use(VueRouter)

import store from './store'

let router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: resolve => require(['./components/Index.vue'], resolve),
            // 路由拦截
            beforeEnter: (to, from, next) => {
                if (store.state.token == null) {
                    // token 不存在时跳转到login
                    next('/login');
                } else {
                    // 显示进度条
                    iView.Spin.show();

                    store.dispatch('getSysInitData').then(() => {
                        iView.Spin.hide();
                        next()
                    })
                }
            },
        },
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['./components/Login.vue'], resolve)
        }
    ]
})

// 全局路由拦截器
router.beforeEach((to, from, next) => {
    if (to.matched.length == 0) {
        // 路由没有匹配到是
        // 返回Index
        next({
            name: 'Index',
            replace: true
        })
    } else {
        if (to.name != 'Index') {
            // 路由不是Index显示顶部加载条
            iView.LoadingBar.start()
        }
        next()
    }
})

// 结束拦截
router.afterEach((to, from) => {
    if (to.name != 'Index') {
        // 隐藏顶部加载条
        iView.LoadingBar.finish()
    }
})


export default router