
const module = {
    namespaced: true,
    state: {
        files: [
            {'id': 1, 'src': 'http://placehold.it/150x150'},
            {'id': 2, 'src': 'http://placehold.it/150x150'},
            {'id': 3, 'src': 'http://placehold.it/150x150'},
            {'id': 4, 'src': 'http://placehold.it/150x150'},
            {'id': 5, 'src': 'http://placehold.it/150x150'},
            {'id': 6, 'src': 'http://placehold.it/150x150'},
            {'id': 7, 'src': 'http://placehold.it/150x150'},
            {'id': 8, 'src': 'http://placehold.it/150x150'},
        ]
    },
    mutations: {
        MEDIA_REQUEST: (state, files) => {
            state.files = files;
        }
    },
    actions: {
        getMedia: ({commit, dispatch}, userId) => {
            return new Promise((resolve, reject) => {
                resolve()
                /*
                axios.get('media/user/'+userId).then(resp => {
                    commit('MEDIA_REQUEST', resp.data.data)
                    resolve(resp.data)
                })
                .catch(err => {
                    reject(err)
                })
                */
            })
        }
    },
    getters: {
        files: state => state.files,
    }
}
  
export default module
