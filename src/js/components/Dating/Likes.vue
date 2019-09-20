<template>
    <div id="likes" class="row">
        <div class="col d-md-none">
            <div class="row header">
                <div class="col-6 text-center">
                    <h6>
                        <router-link :to="{ name: 'likes', params: {page:'matched'}}" class="text-center">
                            Matched
                        </router-link>
                    </h6>
                </div>
                <div class="col-6 text-center">
                    <h6>
                        <router-link :to="{ name: 'likes', params: {page:'liked'}}" class="text-center">
                            Liked
                        </router-link>
                    </h6>
                </div>
            </div>
        </div>
        <div class="col-md-9 order-1 order-md-0 mt-2">
            <div class="row">
                <div v-for="item in users"
                    v-bind:item="item.user" :key="item.user.id"
                    class="col-6 col-md-4 col-lg-3" @click="openProfile(item.user.id)">
                        <user-card :user="item.user" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import store from '../../store'
import UserCard from '../User/Card.vue'

export default {
    components: {
        UserCard
    },
    data() {
        return {
            page: 'likes',
            window: {
                width: 0,
                height: 0
            }
        }
    },
    computed: {
        users() {
            if(this.page === 'matched') {
                return store.getters['likes/matched']
            }
            else {
                return store.getters['likes/likes']
            }
        },
        user() {
            return store.getters['auth/user']
        },
    },
    watch: {
        '$route': 'routeChanged',
    },
    mounted() {
        this.routeChanged();
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        routeChanged() {
            this.page = this.$route.params.page

            if(this.page === 'matched') {
                store.dispatch('likes/getMatched')
            }
            else {
                store.dispatch('likes/getLikes', this.user)
            }
            
        },
        openProfile(userId) {
            this.$router.push({ name: 'view-profile', params: { userId:userId } })
        },
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
    }
}
</script>
