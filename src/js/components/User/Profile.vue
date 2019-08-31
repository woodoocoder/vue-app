<template>
<div id="profile" class="row">

    <div class="col-3">
        <img class="avatar" :src="baseURL+user.avatar_url" :alt="user.firstname">
    </div>
    <div class="col-9 header">
        <div class="row">
            <div class="col-9">
                <h5>{{ user.firstname }} {{ user.lastname }}</h5>
            </div>
            <div class="col-3">
                <router-link v-if="!userId || userId == user.id" :to="{ name: 'settings' }" class="text-center float-right">
                    <font-awesome-icon icon="cog" />
                </router-link>
            </div>
            <div v-if="user.filters && user.filters.city" class="col-12 location">
                {{user.filters.city.name}}
            </div>
        </div>
    </div>

    <div class="col-12 mt-2">
        <h5>Personal information</h5>

        <div v-for="info in user.information"
                v-bind:item="info" :key="info.id">
            <div class="row" v-if="info">
                <div class="col-6 col-sm-3">
                    {{info.type}}:
                </div>
                <div class="col-6 col-sm-9">
                    {{info.name}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from '../../store'

export default {
    data() {
        return {
            baseURL: window.baseURL,
            userId: null
        }
    },
    computed: {
        info() {
            return store.getters['dictionary/info'];
        },
        user() {
            return store.getters['user/user'];
        },
    },
    mounted() {
        this.userId = this.$route.params.userId
    },
    created() {
        store.dispatch('user/getUser')
        store.dispatch('dictionary/getInfo')
    },
    methods: {
        getInfoName: function(id) {
            return this.info.forEach(function(item) {
                console.log(item);
                if(id == item.id) {
                    console.log(item.name);
                    return item.name;
                }
            });
        }
    }
}
</script>
