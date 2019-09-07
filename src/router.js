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
            meta:{
                title: '喵喵影院'
            }
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
                {path: 'nowplaying', component: () => import('@/pages/movie/nowPlaying'),
                },
                {path: 'comingsoon', component: () => import('@/pages/movie/comingSoon'),

                },
                {path: '/movie', redirect: '/movie/nowplaying',}
            ]
        },
        {
            path: '/mine',
            component: () => import('@/pages/mine'),
            meta: {
                title: '我的喵喵'
            }
        }
    ]
})