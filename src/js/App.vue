<template>
    <div>
        <div class="container-fluid">
            <div id="main-navbar" class="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
                <div class="d-none d-sm-block col-sm-5 col-md-6">

                </div>
                <div class="col-12 col-sm-7 col-md-6">
                    <div class="container">
                        <div v-if="isAuthenticated" class="row">
                            <div class="col-3 text-center">
                                <router-link :to="{ name: 'home' }" class="text-center home-link">
                                    <font-awesome-icon icon="users" />
                                </router-link>
                            </div>
                            <div class="col-3 text-center">
                                <router-link :to="{ name: 'likes', params: {page:'liked'}}" class="text-center">
                                    <font-awesome-icon icon="heart" />
                                </router-link>
                                <span v-if="unreadLikes > 0" class="counter">
                                    {{unreadLikes}}
                                </span>
                            </div>
                            <div class="col-3 text-center">
                                <router-link :to="{ name: 'dialogs' }" class="text-center">
                                    <font-awesome-icon icon="envelope" />
                                </router-link>
                                <span v-if="unreadDialogs > 0" class="counter">
                                    {{unreadDialogs}}
                                </span>
                            </div>
                            <div class="col-3 text-center">
                                <router-link :to="{ name: 'profile' }" class="text-center profile-link">
                                    <font-awesome-icon icon="user" />
                                </router-link>
                            </div>
                        </div>
                        <div v-else="" class="row">
                            <div class="col-6 text-center">
                                <router-link :to="{ name: 'login' }" class="text-center">
                                    <h5>Login</h5>
                                </router-link>
                            </div>
                            <div class="col-6 text-center">
                                <router-link :to="{ name: 'register' }" class="text-center">
                                    <h5>Register</h5>
                                </router-link>
                            </div>
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

import {Howl, Howler} from 'howler';
Howler.autoUnlock = true;

export default {
    data() {
        return {
            baseURL: window.baseURL,
            scrollY: 0,
            sound: false
        }
    },
    computed: {
        isAuthenticated() {
            return store.getters['auth/isAuthenticated']
        },
        user() {
            return store.getters['auth/user']
        },
        dialogs() {
            return store.getters['dialogs/dialogs']
        },
        dialog() {
            return store.getters['dialogs/dialog']
        },
        unreadDialogs() {
            var unreadDialogs = store.getters['dialogs/unreadDialogs']
            return unreadDialogs.length<100?unreadDialogs.length:'99+';
        },
        likes() {
            return store.getters['likes/likes']
        },
        unreadLikes() {
            var unreadCount = store.getters['likes/unreadCount']
            return unreadCount<100?unreadCount:'99+';
        },
    },
    watch: {
        '$route': 'routeChanged',
        'scrollY': function(from, to) {
            //console.log(from+' '+to);
        },
        dialogs: function(val) {
            if(Object.keys(this.dialog).length === 0) {
                this.playSound()
            }
        },
        unreadLikes: function(val) {
            if(Object.keys(this.unreadLikes).length === 0) {
                this.playSound()
            }
        },
    },
    methods: {
        routeChanged() {
            $('.navbar-collapse').collapse('hide');
        },
        handleScroll() {
            this.scrollY = window.scrollY;
        },
        playSound() {
            var _this = this;
            
            if(!this.sound) {
                this.sound = new Howl({
                    src: ['./accomplished.mp3'],
                    html5: true,
                    preload: true,
                    volume: .7,
                    onplayerror: function() {
                        _this.sound.once('unlock', function() {
                            _this.sound.play();
                        });
                    }
                });
            }
            else {
                this.sound.play();
            }
        }
    },
    created () {
        var _this = this;
        if(this.isAuthenticated) {
            store.dispatch('auth/getUser')
                .then(function(response) {
                    store.dispatch('dialogs/getDialogs', _this.user)
                    store.dispatch('likes/getLikes', _this.user)
                })
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
