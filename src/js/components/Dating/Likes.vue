<template>
    <div id="likes" class="row">
        <div class="col d-md-none">
            <div class="row header">
                <div class="col-6 text-center">
                    <h6>
                        <router-link :to="{ name: 'matched' }" class="text-center">
                            Matched
                        </router-link>
                    </h6>
                </div>
                <div class="col-6 text-center">
                    <h6>
                        <router-link :to="{ name: 'likes' }" class="text-center">
                            Liked
                        </router-link>
                    </h6>
                </div>
            </div>
        </div>
        <div class="col-md-9 order-1 order-md-0 mt-2">
            <div class="row">
                <div v-for="item in users"
                    v-bind:item="item" :key="item.id"
                    class="col-6 col-md-4 col-lg-3" @click="openProfile(item.id)">
                        <user-card :user="item" />
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
            window: {
                width: 0,
                height: 0
            }
        }
    },
    computed: {
        users() {
            return store.getters['dating/users']
        },
    },
    mounted() {
        store.dispatch('dating/getUsers')
    },
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
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
