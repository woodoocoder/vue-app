
const module = {
    namespaced: true,
    state: {
        cities: []
    },
    mutations: {
        CITIES_REQUEST: (state, cities) => {
            state.cities = [];
            cities.forEach(function(item) {
                var name = (item.name)? item.name: item.en_name;

                if(item.region) {
                    name += ', '+((item.region.name)? item.region.name: item.region.en_name);
                }

                if(item.country) {
                    name += ', '+((item.country.name)? item.country.name: item.country.en_name);
                }

                state.cities.push({
                    id: item.id,
                    name: name
                });
            })
        }
    },
    actions: {
        getCities: ({commit, dispatch}, params) => {
            return new Promise((resolve, reject) => {
                axios.get('location/cities?q='+params.q).then(resp => {
                    commit('CITIES_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
    },
    getters: {
        cities: state => state.cities,
    }
}
  
export default module
