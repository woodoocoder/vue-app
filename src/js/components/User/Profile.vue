<template>
<div v-if="user.information" class="row">

    <div class="col-12">
        <h4>Location</h4>

        <div v-if="user.filters.city">{{user.filters.city.name}}</div>
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
