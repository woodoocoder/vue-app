import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/auth'
import location from './store/location'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        location
    }
})
