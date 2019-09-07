import Vue from 'vue'
import VueX from 'vuex'
Vue.use(VueX)
import city from './city'
export default new VueX.Store({
    modules:{
        city
    }
})