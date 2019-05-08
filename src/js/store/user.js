
const module = {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        USER_REQUEST: (state, user) => {
            state.user = user;
        }
    },
    actions: {
        getUser: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                axios.get('auth/user').then(resp => {
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

    },
    getters: {
        user: state => state.user,
    }
}
  
export default module
