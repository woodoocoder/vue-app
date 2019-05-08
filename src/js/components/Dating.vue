<template>
    <div class="row">
        <div class="col-sm-4">
            <h4 class="text-center">I’m here to</h4>
            
            <div class="form-check" v-for="item in reasons" 
                v-bind:item="item" :key="item.id">

                <input class="form-check-input" type="radio"
                    v-model="data.filters.reason"
                    name="reason" :value="item.id" required>

                <label class="form-check-label" for="exampleRadios1">
                    {{ item.name }}
                </label>
            </div>
            
        </div>
        <div class="col-sm-4">
            <h4 class="text-center">Show</h4>

            <div class="row">
                <div class="col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="data.filters.gender" name="gender" value="M" required>
                        <label class="form-check-label" for="exampleRadios1">
                            Male
                        </label>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="data.filters.gender" name="gender" value="F" required>
                        <label class="form-check-label" for="exampleRadios2">
                            Female
                        </label>
                    </div>
                </div>
            </div>


            <h4 class="text-center">Age</h4>

            <div class="row">
                <div class="col-4">
                    fsd
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <h4 class="text-center">Where</h4>

            <autocomplete
                v-model="cities"
                :onFocus="citiesOnFocus"
                :onSelect="citySelected"
                :onEnterText="searchCity"
                id="cities-select"
                name="autocomplete" />
        </div>
    </div>
</template>


<script>
import store from '../store'
import Autocomplete from './UI/Autocomplete.vue'

export default {
    components: {
        Autocomplete
    },
    data() {
        return {
            data: {
                filters: {
                    reason: null,
                    gender: null,
                    city_id: null,
                }
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
    },
    mounted() {
        store.dispatch('dictionary/getReasons')
    },
    methods: {
        citiesOnFocus: function(e) {


            //store.dispatch('location/getCities', { q: q})
        },
        citySelected: function(city) {
            this.data.filters.city_id = city.id
        },
        searchCity: function(q) {
            if(q.length >= 3) {
                store.dispatch('location/getCities', { q: q})
            }
        },
    }
}
</script>
