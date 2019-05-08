<template>
<div>
    <div class="row">
        <div class="col-12">
            <h4>About You</h4>

            <div class="row"
                v-for="infoItem in info"
                v-bind:item="infoItem" :key="infoItem.name">
                <div class="col-3">
                    {{ infoItem.name }}
                </div>
                <div class="col-9">
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
            return store.getters['dictionarie/info']
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

        store.dispatch('dictionarie/getInfo')
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
        }
    }
}
</script>
