
import Home from './components/Home.vue';
import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';

import Profile from './components/User/Profile.vue';
import Settings from './components/User/Settings.vue';

import store from './store'

var ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}


export default {
  //mode: 'history',
  routes: [
    {
      path: '/', name: 'home', component: Home,
    },
    {
        path: '/register', name: 'register', component: Register,
    },
    {
        path: '/login', name: 'login', component: Login,
    },
    {
        path: '/profile', name: 'profile', component: Profile,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/settings', name: 'settings', component: Settings,
        beforeEnter: ifAuthenticated,
    },
  ]
}
