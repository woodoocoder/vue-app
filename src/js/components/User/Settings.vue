<template>
<div>
    <div class="row pt-3">
        <div class="col-12">
            <h4 class="text-center">About You</h4>

            <div class="row"
                v-for="infoItem in info"
                v-bind:item="infoItem" :key="infoItem.name">
                <div class="col-4">
                    {{ infoItem.name }}
                </div>
                <div class="col-8">
                    <vue-select
                        :title="infoItem.name"
                        :options="infoItem.items"
                        :name="infoItem.key"
                        :valueField="'id'"
                        :textField="'name'"
                        :selected="information[infoItem.key]"
                        :onSelect="infoSelected"
                        :placeholder="infoItem.name"/>
                </div>
            </div>
        </div>
        <div class="col-12">
            <a href="#" @click="logout()">Logout</a>
        </div>
    </div>
</div>
</template>

<script>
import store from '../../store'
import VueSelect from '../UI/Select.vue';

export default {
    components: {
        VueSelect
    },
    data() {
        return {
            information: {
                relationship: null,
                living: null,
                children: null,
                smoking: null,
                drinking: null
            }
        }
    },
    computed: {
        info() {
            return store.getters['dictionary/info']
        },
        user() {
            return store.getters['user/user']
        },
    },
    mounted() {
        var _this = this;
        store.dispatch('user/getUser')
            .then(function(response) {
                _this.updateSelectedInfo(response.data)
            })

        store.dispatch('dictionary/getInfo')
    },
    methods: {
        infoSelected: function(selected) {
            var _this = this;
            var data = {};
            data[selected.key+'_id'] = selected.id
            
            store.dispatch('user/updateInformation', data)
                .then(function(response) {
                    _this.updateSelectedInfo(response.data)
                })
        },
        updateSelectedInfo: function(data) {
            if(data.information !== null) {
                this.information = data.information
            }
        },
        logout: function () {
            store.dispatch('auth/logout').then(resp => {
                this.$router.go('/login')
            })
        }
    }
}
</script>
