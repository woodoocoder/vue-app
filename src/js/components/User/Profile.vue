<template>
<div v-if="Object.keys(user).length !== 0" id="profile" class="row pt-3 pb-4">
    
    <div class="col-3 text-center">
        <avatar :user="user" size="60" :rounded="true" />
    </div>

    <div class="col-9 header">
        <div class="row">
            <div class="col-9">
                <h5>{{ user.firstname }} {{ user.lastname }}</h5>
            </div>
            <div class="col-3">
                <router-link v-if="userId == null || userId == authUser.id" :to="{ name: 'settings' }" class="text-center float-right">
                    <font-awesome-icon icon="cog" />
                </router-link>
            </div>
            <div v-if="user.filters && user.filters.city" class="col-12 location">
                {{user.filters.city.name}}
            </div>
        </div>
    </div>

    <div class="col-12 col-sm-9 mt-3 order-sm-1 personal-info">
        <div v-for="info in user.information">
            <div class="row item" v-if="info">
                <div class="col-5 col-sm-4">
                    <h6>{{info.type}}:</h6>
                </div>
                <div class="col-7 col-sm-8">
                    {{info.name}}
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-sm-3 mt-3 order-sm-0">
        <div v-if="user.id != authUser.id" class="row actions">
            <div class="col-6 text-center">
                <router-link :to="{ name: 'new-dialog', params: { participantId: user.id }}" class="text-center">
                    <font-awesome-icon icon="envelope" class="new-dialog"/>
                </router-link>
            </div>
            <div class="col-6 text-center">
                <div class="text-center" @click="like()">
                    <font-awesome-icon icon="heart" class="like" />
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 mt-3 order-sm-2">
        <carousel></carousel>
    </div>
</div>
</template>

<script>
import Avatar from './Avatar.vue'
import Carousel from '../Media/Carousel.vue'
import store from '../../store'

export default {
    data() {
        return {
            baseURL: window.baseURL,
            userId: null
        }
    },
    components: {
        Avatar,
        Carousel
    },
    computed: {
        info() {
            return store.getters['dictionary/info'];
        },
        authUser() {
            return store.getters['auth/user']
        },
        user() {
            return store.getters['user/user'];
        },
    },
    watch: {
        '$route': 'getInformation',
    },
    methods: {
        getInformation() {
            this.userId = this.$route.params.userId

            store.dispatch('user/getUser', this.userId)
            store.dispatch('dictionary/getInfo')
        },
        getInfoName: function(id) {
            return this.info.forEach(function(item) {
                if(id == item.id) {
                    return item.name;
                }
            });
        },
        like() {
            var data = {
                user_id: this.userId
            }
            store.dispatch('likes/newLike', data)
                .then(function(response) {

                })
        }
    },
    beforeMount () {
        this.getInformation();
    },
}
</script>
