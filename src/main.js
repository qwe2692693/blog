import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './plugins/element.js'

router.afterEach(() => {
    window.scrollTo(0, 0)
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')