<template>
    <div>
        <div class="container-fluid">
            <div id="main-navbar" class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
                <div class="col-12">
                    <div v-if="isAuthenticated" class="row">
                        <div class="col-4 text-center">
                            <router-link :to="{ name: 'home' }" class="text-secondary text-center">
                                <font-awesome-icon icon="home" />
                            </router-link>
                        </div>
                        <div class="col-4 text-center">
                            <!--
                            <router-link :to="{ name: 'profile' }" class="text-secondary text-center">
                                {{ user.firstname }}
                            </router-link>
                            -->
                        </div>
                        <div class="col-4 text-center">
                            <router-link :to="{ name: 'settings' }" class="text-secondary text-center">
                                <font-awesome-icon icon="cog" />
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
    
    computed: {
        isAuthenticated() {
            return store.getters['auth/isAuthenticated']
        },
        user() {
            return store.getters['auth/user']
        }
    },
    watch: {
        '$route': 'routeChanged'
    },
    methods: {
        routeChanged() {
            $('.navbar-collapse').collapse('hide');
        }
    },
    created () {
        if(this.isAuthenticated) {
            store.dispatch('auth/getUser');
        }
        
    }
}
</script>
