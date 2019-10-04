<template>
    <div class="row">
        <div class="col d-md-none">
            <div class="row header justify-content-end">
                <div @click="filterOpened = !filterOpened" class="col-3 text-right">
                    <font-awesome-icon icon="cog" />
                </div>
            </div>
        </div>
        <div v-if="window.width >= 768" class="col-md-3 order-0 order-md-1 mb-2">
            <search-filter></search-filter>
        </div>
        <div class="col-md-9 order-1 order-md-0 mt-2">
            <div class="row">
                <div v-for="item in users"
                    v-bind:item="item" :key="(item&&item.id)?item.id:null"
                    class="col-6 col-md-4 col-lg-3" @click="openProfile(item.id)">
                        <user-card :user="item" />
                </div>
            </div>
        </div>

        <modal v-if="window.width < 768" :showModal="filterOpened" @close="filterOpened = false">
            <template v-slot:header><h3 class="text-center">Search filter</h3></template>
            <template v-slot:body>
                <div class="col-12">
                    <search-filter  @close="filterOpened = false"></search-filter>
                </div>
            </template>
        </modal>
    </div>
</template>


<script>
import Modal from '../UI/Modal';
import store from '../../store'
import UserCard from '../User/Card.vue'
import SearchFilter from './SearchFilter.vue'

export default {
    components: {
        Modal,
        UserCard,
        SearchFilter
    },
    data() {
        return {
            filterOpened: false,
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
