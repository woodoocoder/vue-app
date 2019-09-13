
const module = {
    namespaced: true,
    state: {
        likes: [],
        unreadLikes: []
    },
    mutations: {
        LIKES_REQUEST: (state, likes) => {
            state.likes = likes;
        },
        NEW_LIKE: (state, message) => {
            state.messages.push(message);
        }
    },
    actions: {
        getLikes: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                axios.get('likes').then(resp => {
                    commit('LIKES_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        newLike: ({commit, dispatch}, params) => {
            return new Promise((resolve, reject) => {
                axios.post('likes', params).then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
    },
    getters: {
        likes: state => state.likes,
        unreadLikes: state => state.unreadLikes,
    }
}
  
export default module
