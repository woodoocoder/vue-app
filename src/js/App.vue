<template>
    <div>
        <div class="container-fluid">
            <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top navbar-laravel">
                <router-link :to="{ name: 'home' }" class="navbar-brand">Home</router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul v-if="isAuthenticated" class="navbar-nav ml-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ user.firstname }} <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <router-link :to="{ name: 'profile' }" class="dropdown-item">Profile</router-link>
                                </li>
                                <li>
                                    <a href="#" @click="logout()" class="dropdown-item">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul v-else="" class="navbar-nav ml-auto">
                        <li>
                            <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
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
    methods: {
        logout: function () {
            store.dispatch('auth/logout').then(resp => {
                this.$router.go('/login')
            })
        }
    },
    created () {
        if(this.isAuthenticated) {
            store.dispatch('auth/getUser');
        }
        
    }
}
</script>
