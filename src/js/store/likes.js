import Vue from 'vue'

const module = {
    namespaced: true,
    state: {
        likes: [],
        matched: [],
        unreadLikes: [],
        unreadMatchedLikes: []
    },
    mutations: {
        LIKES_REQUEST: (state, likes) => {
            state.likes = likes;
        },
        MATCHED_REQUEST: (state, matched) => {
            state.matched = matched;
        },
        NEW_LIKE: (state, like) => {
            var exist = false;
            state.likes.forEach(function(item, i) {
                if(item.id === like.id) {
                    Vue.set(state.likes, i, like);
                    exist = true;
                }
            })
            if(!exist) {
                state.likes.push(like);
                state.unreadLikes.push(like.id);
            }
        },
        NEW_MATCHED_LIKE: (state, like) => {
            var exist = false;
            state.matched.forEach(function(item, i) {
                if(item.id === like.id) {
                    Vue.set(state.matched, i, like);
                    exist = true;
                }
            })
            if(!exist) {
                state.matched.push(like);
                state.unreadMatchedLikes.push(like.id);
            }
        }
    },
    actions: {
        getLikes: ({commit, state}, user) => {
            var channelName = 'likes.'+user.id;
            
            if (state.likes.length > 0) {
                Echo.leave(channelName);
            }
            Echo.private(channelName)
              .listen('.new-like', (e) => {
                commit('NEW_LIKE', e.data)
            }).listen('.new-matched-like', (e) => {
                commit('NEW_MATCHED_LIKE', e.data)
            });

            return new Promise((resolve, reject) => {
                axios.get('user/likes').then(resp => {
                    commit('LIKES_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        getMatched: ({commit, state}) => {
            return new Promise((resolve, reject) => {
                axios.get('user/likes/matched').then(resp => {
                    commit('MATCHED_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        newLike: ({commit, state}, params) => {
            return new Promise((resolve, reject) => {
                axios.post('user/likes/'+params.user_id).then(resp => {
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
        matched: state => state.matched,
        unreadCount: function(state) {
            return state.unreadLikes.concat(state.unreadMatchedLikes).length
        }
    }
}
  
export default module
