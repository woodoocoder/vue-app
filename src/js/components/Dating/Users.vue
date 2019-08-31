<template>
    <div class="row">
        <div class="col d-md-none">
            <div class="row header justify-content-end">
                <div @click="showHideFilter()" class="col-3 text-right">
                    <div v-if="filterOpened">
                        <font-awesome-icon icon="times" />
                    </div>
                    <div v-else="">
                        <font-awesome-icon icon="cog" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="filterOpened || window.width >= 768" class="col-md-3 order-0 order-md-1 mb-2">
            <search-filter></search-filter>
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
import SearchFilter from './SearchFilter.vue'

export default {
    components: {
        UserCard,
        SearchFilter
    },
    data() {
        return {
            filterOpened: false ,
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
        showHideFilter() {
            this.filterOpened = !this.filterOpened;
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
