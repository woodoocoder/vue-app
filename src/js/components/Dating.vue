<template>
    <div class="row">
        <div class="col-sm-9">
            <div class="row">
                <div v-for="item in users"
                    v-bind:item="item" :key="item.id"
                    class="col-sm-3">
                        <user-card :user="item" />
                </div>
            </div>
        </div>

        <div class="col-sm-3">
            <div class="row">
                <div class="col-12">
                    <h4 class="text-center">I’m here to</h4>
                    
                    <div class="form-check" v-for="item in reasons" 
                        v-bind:item="item" :key="item.id">

                        <input class="form-check-input" type="radio"
                            v-model="filters.reason"
                            name="reason" :value="item.id" required>

                        <label class="form-check-label" for="exampleRadios1">
                            {{ item.name }}
                        </label>
                    </div>
                    
                </div>
                <div class="col-12">
                    <h4 class="text-center">Show</h4>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" v-model="filters.gender" name="gender" value="M" required>
                                <label class="form-check-label" for="exampleRadios1">
                                    Male
                                </label>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" v-model="filters.gender" name="gender" value="F" required>
                                <label class="form-check-label" for="exampleRadios2">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>


                    <h4 class="text-center">Age</h4>

                    <div class="row">
                        <div class="col-12">
                            fsd
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <h4 class="text-center">Where</h4>

                    <autocomplete
                        v-model="cities"
                        :onFocus="citiesOnFocus"
                        :onSelect="citySelected"
                        :onEnterText="searchCity"
                        id="cities-select"
                        name="autocomplete" />
                </div>
                <div class="col-12">
                    <button @click.prevent="searchUsers()">Search</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import store from '../store'
import Autocomplete from './UI/Autocomplete.vue'
import UserCard from './User/Card.vue'

export default {
    components: {
        Autocomplete,
        UserCard
    },
    data() {
        return {
            filters: {
                reason: null,
                gender: null,
                city_id: null,
            }
        }
    },
    computed: {
        reasons() {
            return store.getters['dictionary/reasons']
        },
        cities() {
            return store.getters['location/cities']
        },
        users() {
            return store.getters['dating/users']
        },
    },
    mounted() {
        store.dispatch('dictionary/getReasons')

        store.dispatch('dating/getUsers', this.filters)
    },
    methods: {
        citiesOnFocus: function(e) {


            //store.dispatch('location/getCities', { q: q})
        },
        citySelected: function(city) {
            this.filters.city_id = city.id
        },
        searchCity: function(q) {
            if(q.length >= 3) {
                store.dispatch('location/getCities', { q: q})
            }
        },
        searchUsers:function() {
            var filters = this.filters;

            store.dispatch('dating/getUsers', filters)
        }
    }
}
</script>
