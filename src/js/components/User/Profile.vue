<template>
<div id="profile" class="row">

    <div class="col-4">
        <img class="avatar" :src="baseURL+user.avatar_url" :alt="user.firstname">
    </div>
    <div class="col-8">
        <b>{{ user.firstname }} {{ user.lastname }}</b>
        <router-link :to="{ name: 'settings' }" class="text-center float-right">
            <font-awesome-icon icon="cog" />
        </router-link>

        <div v-if="user.filters && user.filters.city">{{user.filters.city.name}}</div>
    </div>

    <div class="col-12 mt-2">
        <h4>Personal information</h4>

        <div v-for="info in user.information">
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
            baseURL: window.baseURL
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
