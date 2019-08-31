require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

import Routes from './routes';
import App from './App.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(require('vue-moment'));

Vue.use(VueRouter);
Vue.router = new VueRouter(Routes);

export default Vue;

App.router = Vue.router

new Vue({
    el: '#app',
    render: app => app(App)
});
