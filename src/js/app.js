require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment';

import Routes from './routes';
import App from './App.vue';


Vue.use(require('vue-moment'), {moment})

Vue.use(VueRouter);
Vue.router = new VueRouter(Routes);

export default Vue;

App.router = Vue.router

new Vue({
    el: '#app',
    render: app => app(App)
});
