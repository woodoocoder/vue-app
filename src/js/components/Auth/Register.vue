<template>
    <div class="card">
        <div class="card-header">
            <h3>Sign up</h3>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <form class="register" @submit.prevent="signup">

                        <div class="row">
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
                        </div>

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

                        <div class="form-group">
                            <label>Email</label>
                            <input required v-model="data.email" type="text" class="form-control" placeholder="Email"/>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input required v-model="data.password" type="password" class="form-control" placeholder="Password"/>
                        </div>

                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input required v-model="data.password_confirmation" type="password" class="form-control" placeholder="Password"/>
                        </div>

                        <hr/>
                        <button type="submit">Register</button>
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
            data: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                password_confirmation: '',
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
    },
    methods: {
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

            console.log(data);
            return;

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
