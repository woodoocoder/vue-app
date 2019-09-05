
const module = {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        USER_REQUEST: (state, user) => {
            state.user = user;

            if(user.filters && user.filters.city) {
                var city = user.filters.city;
                var cityName = (city.name)? city.name: city.en_name;

                if(city.region) {
                    cityName += ', '+((city.region.name)? city.region.name: city.region.en_name);
                }

                if(city.country) {
                    cityName += ', '+((city.country.name)? city.country.name: city.country.en_name);
                }

                state.user.filters.city.name = cityName;
            }
        }
    },
    actions: {
        getUser: ({commit, dispatch}, userId) => {
            return new Promise((resolve, reject) => {
                var url = (userId)?'user/show/'+userId:'user';
                axios.get(url).then(resp => {
                    commit('USER_REQUEST', resp.data.data)
                    resolve(resp.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        updateInformation: ({commit, dispatch}, data) => {
            return new Promise((resolve, reject) => {
                axios.put('user/information', data).then(resp => {
                    commit('USER_REQUEST', resp.data.data)
                    resolve(resp.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        updateFilters: ({commit, dispatch}, data) => {
            return new Promise((resolve, reject) => {
                axios.put('user/filters', data).then(resp => {
                    commit('USER_REQUEST', resp.data.data)
                    resolve(resp.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },

    },
    getters: {
        user: state => state.user,
    }
}
  
export default module
