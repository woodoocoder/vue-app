
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
            state.messages.push(message);
        }
    },
    actions: {
        clearDialog: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                commit('CLEAR_DIALOG')
            })
            .catch(err => {
                reject(err)
            })
        },
        getDialogs: ({commit, dispatch}) => {
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
        newDialog: ({commit, dispatch}, params) => {
            return new Promise((resolve, reject) => {
                axios.post('dialogs', params).then(resp => {
                    resolve(resp.data.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        getDialog: ({commit, dispatch}, params) => {
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
        getMessages: ({commit, dispatch}, params) => {
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
        sendMessage: ({commit, dispatch}, params) => {
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
