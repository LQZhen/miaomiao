import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/movie',
        },
        {
            path: '/cinema',
            component: () => import('@/pages/cinema'),
            meta: {
                title: '喵喵影院'
            }
        },
        {
            path: '/movie/detail/:id',
            component: () => import('@/pages/movie/detail'),
            meta: {
                title: '电影详情',
            },
            props: true
        },
        {
            path: '/movie',
            component: () => import('@/pages/movie'),
            children: [
                {
                    path: 'city', component: () => import('@/pages/movie/city'),
                },
                {
                    path: 'search', component: () => import('@/pages/movie/search'),
                },
                {
                    path: 'nowplaying', component: () => import('@/pages/movie/nowPlaying'),
                },
                {
                    path: 'comingsoon', component: () => import('@/pages/movie/comingSoon'),
                },
                {path: '/movie', redirect: '/movie/nowplaying',}
            ]
        },
        {
            path: '/mine',
            component: () => import('@/pages/mine'),
            children: [
                {path: '/mine', redirect: '/mine/center'},
                {
                    path: 'login', component: () => import('@/components/Login'),
                    meta: {
                        title: '我的喵喵'
                    },
                },
                {
                    path: 'center', component: () => import('@/pages/mine/center'),
                    meta: {
                        title: '我的喵喵'
                    },
                },
                {
                    path: "register", component: () => import('@/components/Register'),
                    meta: {
                        title: '我的喵喵'
                    },
                },
                {
                    path: 'repassword', component: () => import('@/components/Repassword'),
                    meta: {
                        title: '我的喵喵'
                    },
                }
            ]
        }
    ]
})