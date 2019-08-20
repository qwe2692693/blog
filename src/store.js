import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        serveUrl: axios.defaults.baseURL,
        imgNull: require('@/assets/images/undefined.jpg'),
        homeActive: '首页'
    },
    getters: {
        doneServeUrl: (state) => {
            return state.serveUrl.replace('/api', '')
        }
    },
    mutations: {
        homeActiveFun(state, str) {
            state.homeActive = str;
        }
    },
    actions: {

    }
})