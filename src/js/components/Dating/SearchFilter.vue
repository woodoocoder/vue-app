<template>
    <div id="search-filter" class="row">
        <div class="col-12 filter">
            <h5 class="text-center">I’m here to</h5>
            
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
        <div class="col-12 filter">
            <h5 class="text-center">Show</h5>

            <div class="row">
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input" type="radio"
                            v-model="filters.gender" name="gender" value="M" required>
                        <label class="form-check-label" for="exampleRadios1">
                            Male
                        </label>
                    </div>
                </div>
                <div class="col-6">
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
        <div class="col-12 filter">
            <h5 class="text-center">Where</h5>

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
            <div class="btn btn-success btn-block" @click.prevent="searchUsers()">Search</div>
        </div>
    </div>
</template>


<script>
import store from '../../store'
import Autocomplete from '../UI/Autocomplete.vue'
import UserCard from '../User/Card.vue'

export default {
    components: {
        Autocomplete,
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
        }
    },
    mounted() {
        store.dispatch('dictionary/getReasons')
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
