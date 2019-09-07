import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export  default new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/movie'
        },
        {
            path:'/movie',
            component:()=>import('@/pages/movie'),
            meta:{
                title:'喵喵电影'
            }
        },
        {
            path:'/cinema',
            component:()=>import('@/pages/cinema'),
            meta:{
                title:'喵喵影院'
            }
        },
        {
            path:'/mine',
            component:()=>import('@/pages/mine'),
            meta:{
                title:'我的喵喵'
            }
        }
    ]
})