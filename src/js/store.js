import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/auth'
import user from './store/user'
import dating from './store/dating'
import location from './store/location'
import dictionary from './store/dictionary'
import dialogs from './store/dialogs'
import likes from './store/likes'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        user,
        dating,
        location,
        dictionary,
        dialogs,
        likes,
    }
})
