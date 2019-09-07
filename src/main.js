import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Loading from './components/loading'
Vue.component('Loading',Loading)
Vue.prototype.$axios=axios
Vue.filter('setWH',(value,pattern)=>{
    return value.replace(/w\.h/,pattern)
})
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
