import Vue from 'vue'

const module = {
    namespaced: true,
    state: {
        dialogs: [],
        dialog: {},
        dialogChannel: null,
        messages: [],
        unreadDialogs: []
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
        NEW_DIALOG: (state, dialog) => {
            var exist = false;
            state.dialogs.forEach(function(item, i) {
                if(item.id == dialog.id) {
                    Vue.set(state.dialogs, i, dialog);
                    exist = true;
                }
            })
            if(!exist) {
                state.dialogs.unshift(dialog);
            }
        },
        UNREAD_DIALOGS: (state, dialogs) => {
            var newUnreadDialogs = function(newItem) {
                if(newItem.unread_messages > 0) {
                    var data = {
                        id: newItem.id,
                        unread_messages: newItem.unread_messages
                    }
                    state.unreadDialogs.push(data);
                }
            }
            var updateUnreadDialogs = function(newItem) {
                var isset = false;
                state.unreadDialogs.forEach(function(item, i) {
                    if(newItem.id == item.id) {
                        isset = true;
                        if(newItem.unread_messages > 0) {
                            var data = {
                                id: newItem.id,
                                unread_messages: newItem.unread_messages
                            }
                            Vue.set(state.unreadDialogs, i, data);
                        }
                        else {
                            state.unreadDialogs.splice(state.unreadDialogs.indexOf(item), 1);
                        }
                    }
                })
                if(!isset) {
                    newUnreadDialogs(newItem)
                }
            }

            if(dialogs instanceof Array) {
                dialogs.forEach(function(newItem, j) {
                    updateUnreadDialogs(newItem)
                })
            }
            else {
                updateUnreadDialogs(dialogs)
            }

        },
        MESSAGES_REQUEST: (state, messages) => {
            state.messages = messages.reverse();
        },
        NEW_MESSAGE_REQUEST: (state, message) => {
            var exist = false;
            state.messages.forEach(function(item, i) {
                if(item.id == message.id) {
                    Vue.set(state.messages, i, message);
                    exist = true;
                }
            })
            if(!exist) {
                if(state.dialog.id == message.dialog_id) {
                    state.messages.push(message);
                }
            }

            state.dialogs.forEach(function(item, i) {
                if(item.id == message.dialog_id) {
                    state.dialogs[i].latest_message = message
                }
            })
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
        clearUnread: ({commit, state}, dialogId) => {
            state.unreadDialogs.forEach(function(item, i) {
                if(dialogId == item.id && item.unread_messages > 0) {
                    var data = {
                        id: dialogId,
                        unread_messages: 0
                    }

                    commit('UNREAD_DIALOGS', data)

                    return new Promise((resolve, reject) => {
                        axios.put('dialogs/mark_reed/'+dialogId).then(resp => {
                            resolve(resp)
                        })
                        .catch(err => {
                            reject(err)
                        })
                    })
                }
            })
        },
        getDialogs: ({commit, state}, user) => {
            var channelName = 'dialogs.'+user.id;

            if (state.dialogs.length > 0) {
                Echo.leave(channelName);
            }
            Echo.private(channelName).listen('.new-dialog', (e) => {
                if(state.dialog.id == e.data.id) {
                    commit('NEW_DIALOG', e.data)
                }
                commit('UNREAD_DIALOGS', e.data)
            });

            return new Promise((resolve, reject) => {
                axios.get('dialogs').then(resp => {
                    commit('DIALOGS_REQUEST', resp.data.data)
                    commit('UNREAD_DIALOGS', resp.data.data)
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
                state.dialogChannel = null;
            }
            state.dialogChannel = Echo.private(channelName);

            state.dialogChannel.listen('.new-message', (e) => {
                    commit('NEW_MESSAGE_REQUEST', e.data)
                    commit('UNREAD_DIALOGS', [e.data])
                });

            return new Promise((resolve, reject) => {
                axios.get('dialogs/'+params.dialogId).then(resp => {
                    commit('DIALOG_REQUEST', resp.data.data)
                    commit('UNREAD_DIALOGS', [resp.data.data])
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
        clear: ({commit, dispatch}, params) => {
            return new Promise((resolve, reject) => {
                axios.put('dialogs/'+params.dialog_id+'/clear', data).then(resp => {
                    resolve(resp.data)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        delete: ({commit, dispatch}, params) => {
            return new Promise((resolve, reject) => {
                axios.put('dialogs/'+params.dialog_id+'/delete', data).then(resp => {
                    resolve(resp.data)
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
        dialogChannel: state => state.dialogChannel,
        messages: state => state.messages,
        unreadDialogs: state => state.unreadDialogs,
    }
}
  
export default module
