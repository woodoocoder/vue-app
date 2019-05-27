<template>
    <div class="row">
        <div class="col-md-9 order-1 order-md-0 mt-2">
            <div class="row">
                <div v-for="item in users"
                    v-bind:item="item" :key="item.id"
                    class="col-6 col-md-4 col-lg-3">
                        <user-card :user="item" />
                </div>
            </div>
        </div>

        <div class="col-md-3 order-0 order-md-1 mb-2">
            <div class="row">
                <div class="col-12">
                    <h4 class="text-center">I’m here to</h4>
                    
                    <div class="form-check" v-for="item in reasons" 
                        v-bind:item="item" :key="item.id">

                        <input class="form-check-input" type="radio"
                            v-model="filters.reason_id"
                            name="reason_id" :value="item.id" required>

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
                                <input class="form-check-input" type="radio"
                                    v-model="filters.gender" name="gender" value="M" required>
                                <label class="form-check-label" for="exampleRadios1">
                                    Male
                                </label>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-check">
                                <input class="form-check-input" type="radio"
                                    v-model="filters.gender" name="gender" value="F" required>
                                <label class="form-check-label" for="exampleRadios2">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>

                    <!--
                    <h4 class="text-center">Age</h4>

                    <div class="row">
                        <div class="col-12">
                            <base-slider
                                v-model="filters.years"
                                :range="{min: 16, max: 80}"
                                :options="{step: 1, tooltips: true,format: numberFormat}"/>
                        </div>
                    </div>
                    -->
                </div>
                <div class="col-12">
                    <h4 class="text-center">Where</h4>

                    <autocomplete
                        v-model="cities"
                        :selected="selectedCity"
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
//import BaseSlider from './UI/BaseSlider.vue'
import UserCard from './User/Card.vue'

export default {
    components: {
        Autocomplete,
        //BaseSlider,
        UserCard
    },
    data() {
        return {
            filters: {
                reason_id: null,
                gender: null,
                city_id: null,
                years: [18, 30]
            },
            selectedCity: null,
            numberFormat: {
                to: function(v){
                    return v;
                },
                from: function(v) {
                    return v;
                }
            },
        }
    },
    watch: {
        user() {
            if(this.user.filters.reason) {
                this.filters.reason_id = this.user.filters.reason.id
            }

            if(this.user.filters.gender) {
                this.filters.gender = this.user.filters.gender
            }

            if(this.user.filters.city) {
                this.selectedCity = this.user.filters.city
            }
        },
    },
    computed: {
        user() {
            return store.getters['user/user']
        },
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

        store.dispatch('user/getUser')
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
            var _this = this;
            var filters = this.filters;
            
            store.dispatch('user/updateFilters', filters)
                .then(function(response) {
                    store.dispatch('dating/getUsers', filters)
                })

            
        }
    }
}
</script>
