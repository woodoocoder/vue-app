
const module = {
    namespaced: true,
    state: {
        users: null
    },
    mutations: {
        USERS_REQUEST: (state, users) => {
            state.users = users.data;
        }
    },
    actions: {
        getUsers: ({commit, dispatch}, filters) => {
            return new Promise((resolve, reject) => {
                axios.get('dating', {params: filters}).then(resp => {
                    commit('USERS_REQUEST', resp.data)
                    resolve(resp.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
    },
    getters: {
        users: state => state.users,
    }
}
  
export default module
