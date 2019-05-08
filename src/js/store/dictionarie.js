
const module = {
    namespaced: true,
    state: {
        info: []
    },
    mutations: {
        INFO_REQUEST: (state, info) => {
            state.info = info;
        }
    },
    actions: {
        getInfo: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                axios.get('information').then(resp => {
                    commit('INFO_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
    },
    getters: {
        info: state => state.info,
    }
}
  
export default module
