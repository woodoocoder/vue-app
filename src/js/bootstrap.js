window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    window.wNumb = require('wnumb');
    require('bootstrap');
    
} catch (e) {}


window.axios = require('axios');

window.baseURL = 'http://127.0.0.1:8000'
//window.baseURL = 'http://api.dating-app.tk'

window.axios.defaults.baseURL = baseURL+'/api';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = localStorage.getItem('user-token')

if(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
library.add(faHome)
library.add(faCog)