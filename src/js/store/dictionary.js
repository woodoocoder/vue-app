
const module = {
    namespaced: true,
    state: {
        info: [],
        reasons: []
    },
    mutations: {
        INFO_REQUEST: (state, info) => {
            state.info = info;
        },
        REASONS_REQUEST: (state, reasons) => {
            state.reasons = reasons;
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
        getReasons: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                axios.get('reasons').then(resp => {
                    commit('REASONS_REQUEST', resp.data.data)
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
        reasons: state => state.reasons,
    }
}
  
export default module
