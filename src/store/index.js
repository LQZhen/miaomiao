import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)
import city from './city'
import user from './user'
export default new VueX.Store({
    modules:{
        city,
        user
    }
})