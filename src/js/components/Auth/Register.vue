<template>
    <div id="register" class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-12 text-center">
                    <h4>Sign up</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <form class="register" @submit.prevent="signup">
                        <div v-if="currentStep == 1" class="row step-1">
                            <div class="col-12 col-sm-6">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input required v-model="data.firstname" type="text" class="form-control" placeholder="First Name"/>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input required v-model="data.lastname" type="text" class="form-control" placeholder="Last Name"/>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-group">
                                    <label>Your City</label>
                                    <autocomplete
                                        v-model="cities"
                                        :onFocus="citiesOnFocus"
                                        :onSelect="citySelected"
                                        :onEnterText="searchCity"
                                        id="cities-select"
                                        name="autocomplete" />
                                </div>
                            </div>

                            <hr/>
                            <div class="col-12">
                                <div v-on:click="nextStep"
                                    :class="(!step1Validation)?'btn btn-light btn-block continue disabled':'btn btn-success btn-block continue'">
                                    Continue
                                </div>
                            </div>
                        </div>

                        <div v-if="currentStep == 2" class="row step-2">
                            <div class="col-12">
                                <div class="form-group">
                                    <Birthday :onSelect="birthdaySelected" />
                                </div>

                                <div class="form-group">
                                    <label>Gender</label>
                                    <div class="row">
                                        <div class="col-6 col-sm-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" v-model="data.options.gender" name="gender" value="M" required>
                                                <label class="form-check-label" for="exampleRadios1">
                                                    Male
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-6 col-sm-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" v-model="data.options.gender" name="gender" value="F" required>
                                                <label class="form-check-label" for="exampleRadios2">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr/>
                            <div class="col-12">
                                <div v-on:click="nextStep"
                                    :class="(!step2Validation)?'btn btn-light btn-block continue disabled':'btn btn-success btn-block continue'">
                                    Continue
                                </div>
                            </div>
                        </div>

                        <div v-if="currentStep == 3" class="row step-3">
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input required v-model="data.email" type="text" class="form-control" placeholder="Email"/>
                                </div>

                                <div class="form-group">
                                    <label>Password</label>
                                    <input required v-model="data.password" type="password" class="form-control" placeholder="Password"/>
                                </div>

                                <hr/>
                                <div class="col-12">
                                    <button type="submit"
                                        :class="(!step3Validation)?'btn btn-light btn-block continue disabled':'btn btn-success btn-block continue'">
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../store'
import Autocomplete from '../UI/Autocomplete.vue'
import Birthday from '../UI/Birthday.vue'

export default {
    components: {
        Autocomplete,
        Birthday
    },
    data() {
        return {
            currentStep: 1,
            data: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                options: {
                    gender: null,
                    birthday: null,
                    city_id: null,
                }
            },
            birthday: {
                date: 1,
                month: 1,
                year: null,
            }
        }
    },
    computed: {
        cities() {
            return store.getters['location/cities']
        },
        step1Validation() {
            if(this.data.firstname != '' && this.data.lastname != '' && this.data.options.city_id != null) {
                return true;
            }
            else {
                return false;
            }
        },
        step2Validation() {
            if(this.data.options.birthday != null && this.data.options.gender != null) {
                return true;
            }
            else {
                return false;
            }
        },
        step3Validation() {
            if(this.data.email != '' && this.data.password != '') {
                return true;
            }
            else {
                return false;
            }
        }
    },
    methods: {
        nextStep(e) {
            if(!e.target.classList.contains('disabled')) {
                this.currentStep ++;
            }
        },
        citiesOnFocus: function(e) {


            //store.dispatch('location/getCities', { q: q})
        },
        citySelected: function(city) {
            this.data.options.city_id = city.id
        },
        searchCity: function(q) {
            if(q.length >= 3) {
                store.dispatch('location/getCities', { q: q})
            }
        },
        birthdaySelected: function(date) {
            this.data.options.birthday = date
        },
        signup: function () {
            const data = this.data

            store.dispatch('auth/signup', data).then(() => {
                const { email, password } = this.data

                store.dispatch('auth/login', { email, password }).then(resp => {
                    this.$router.push('/')
                })
            })
        }
    }
}
</script>
