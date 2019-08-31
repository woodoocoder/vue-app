<template>
    <div>
        <div class="container-fluid">
            <div id="main-navbar" class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
                <div class="col-12">
                    <div v-if="isAuthenticated" class="row">
                        <div class="col-4 text-center">
                            <router-link :to="{ name: 'home' }" class="text-secondary text-center home-link">
                                <font-awesome-icon icon="users" />
                            </router-link>
                        </div>
                        <div class="col-4 text-center">
                            <router-link :to="{ name: 'dialogs' }" class="text-secondary text-center">
                                <font-awesome-icon icon="envelope" />
                            </router-link>
                        </div>
                        <div class="col-4 text-center">
                            <router-link :to="{ name: 'profile' }" class="text-secondary text-center profile-link">
                                <font-awesome-icon icon="user" />
                            </router-link>
                        </div>
                    </div>
                    <div v-else="" class="row">
                        <div class="col-6 text-center">
                            <router-link :to="{ name: 'login' }" class="text-secondary text-center">
                                Login
                            </router-link>
                        </div>
                        <div class="col-6 text-center">
                            <router-link :to="{ name: 'register' }" class="text-secondary text-center">
                                Register
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import store from './store'

export default {
    data() {
        return {
            baseURL: window.baseURL,
            scrollY: 0
        }
    },
    computed: {
        isAuthenticated() {
            return store.getters['auth/isAuthenticated']
        },
        user() {
            return store.getters['auth/user']
        }
    },
    watch: {
        '$route': 'routeChanged',
        'scrollY': function(from, to) {
            //console.log(from+' '+to);
        }
    },
    methods: {
        routeChanged() {
            $('.navbar-collapse').collapse('hide');
        },
        handleScroll() {
            this.scrollY = window.scrollY;
        }
    },
    created () {
        if(this.isAuthenticated) {
            store.dispatch('auth/getUser');
            store.dispatch('dialogs/getDialogs');
        }
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
