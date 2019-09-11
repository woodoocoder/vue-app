
const module = {
    namespaced: true,
    state: {
        dialogs: [],
        dialog: {},
        messages: []
    },
    mutations: {
        CLEAR_DIALOG: (state) => {
            state.dialog = {};
            state.messages = [];
        },
        DIALOGS_REQUEST: (state, dialogs) => {
            state.dialogs = dialogs;
        },
        DIALOG_REQUEST: (state, dialog) => {
            state.dialog = dialog;
        },
        MESSAGES_REQUEST: (state, messages) => {
            state.messages = messages.reverse();
        },
        NEW_MESSAGE_REQUEST: (state, message) => {
            var exist = false;
            state.messages.forEach(function(item) {
                if(item.id === message.id) {
                    item = message
                    exist = true;
                }
            })
            if(!exist) {
                state.messages.push(message);
            }
        }
    },
    actions: {
        clearDialog: ({commit, state}) => {
            return new Promise((resolve, reject) => {
                commit('CLEAR_DIALOG')
            })
            .catch(err => {
                reject(err)
            })
        },
        getDialogs: ({commit, state}) => {
            return new Promise((resolve, reject) => {
                axios.get('dialogs').then(resp => {
                    commit('DIALOGS_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        newDialog: ({commit, state}, params) => {
            return new Promise((resolve, reject) => {
                axios.post('dialogs', params).then(resp => {
                    resolve(resp.data.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        getDialog: ({commit, state}, params) => {
            var channelName = 'dialog_id.' + params.dialogId;

            if (state.dialog != {}) {
                Echo.leave(channelName);
            }
            Echo.private(channelName).listen('.new-message', (e) => {
                commit('NEW_MESSAGE_REQUEST', e.data)
            });

            return new Promise((resolve, reject) => {
                axios.get('dialogs/'+params.dialogId).then(resp => {
                    commit('DIALOG_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        getMessages: ({commit, state}, params) => {
            return new Promise((resolve, reject) => {
                axios.get('dialogs/'+params.dialogId+'/messages').then(resp => {
                    commit('MESSAGES_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        sendMessage: ({commit, state}, params) => {
            return new Promise((resolve, reject) => {
                axios.post('dialogs/'+params.dialog_id+'/messages', params).then(resp => {
                    commit('NEW_MESSAGE_REQUEST', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
    },
    getters: {
        dialogs: state => state.dialogs,
        dialog: state => state.dialog,
        messages: state => state.messages,
    }
}
  
export default module
