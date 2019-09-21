<template>
    <div v-if="Object.keys(dialog).length !== 0 || !dialogId" class="messages">
        <div class="row header">
            <div class="col-2 text-center" >
                <router-link :to="{ name: 'dialogs' }" class="back-link">
                    <font-awesome-icon icon="chevron-left" />
                </router-link>
            </div>
            <div class="col-8 text-center subject">
                <div v-if="dialog.participants">
                    {{firstParticipant(dialog.participants).firstname}}
                </div>
                <div v-else="">
                    New Dialog
                </div>
            </div>
            <div v-if="dialog.participants" @click="openInfo" class="col-2 text-center">
                <font-awesome-icon icon="info-circle" />
            </div>
        </div>
        <div class="container content">
            <div class="row message"
                v-for="item in messages"
                v-bind:item="item" :key="item.id">
                <div class="col-12">
                    <div :class="isMyMessage(item)?'body right':'body left'">
                        <div v-text="item.message"></div>
                        <span class="date">
                            {{ item.created_at | moment("MM.DD H:mm") }}
                        </span>
                    </div>
                </div>
            </div>


            <div v-if="lastTyping" :class="isTyping">
                typing...
            </div>
        </div>
       <message-form :dialogId="dialogId" :participants="participants"/>
    </div>
</template>

<script>
import store from '../../store'
import MessageForm from './MessageForm.vue'

export default {
    data() {
        return {
            baseURL: window.baseURL,
            dialogId: null,
            participants: [],
            infoOpened: false,
            lastTyping: null,
            timer: null,
        }
    },
    components: {
        MessageForm
    },
    computed: {
        dialog() {
            return store.getters['dialogs/dialog']
        },
        messages() {
            return store.getters['dialogs/messages']
        },
        dialogChannel() {
            return store.getters['dialogs/dialogChannel']
        },
        authUser() {
            return store.getters['auth/user']
        },
        isTyping() {

            if(!this.lastTyping || new Date().getTime() - this.lastTyping > 3000) {
                return 'typing-block d-none';
            }
            else {
                return 'typing-block d-block';
            }
        }
    },
    watch: {
        '$route': 'lodadData',
        messages: function(val) {
            var _this = this;
            if(Object.keys(val).length !== 0) {
                setTimeout(function() {
                    _this.scrollBottom()
                    store.dispatch('dialogs/clearUnread', _this.dialogId)
                }, 200)
            }
        },
    },
    created() {
        var _this = this;
        this.lodadData()

        if(this.dialogChannel) {
            this.dialogChannel.listen('.client-message-typing', (e) => {
                this.lastTyping = new Date().getTime();

                if(!this.timer) {
                    this.timer = setInterval(function() {
                        if(this.lastTyping || new Date().getTime() - _this.lastTyping > 3000) {
                            clearInterval(_this.timer)
                            _this.timer = null
                            _this.lastTyping = null
                        }
                    }, 1000)
                }
            });
        }
    },
    methods: {
        isMyMessage(message) {
            return (this.authUser.id == message.user.id)? true : false;
        },
        scrollBottom() {
            var content = document.querySelector(".content")
            content.scrollTo(0, content.scrollHeight)
        },
        lodadData() {
            var _this = this;
            this.participants[0] = this.$route.params.participantId
            this.dialogId = this.$route.params.dialogId

            store.dispatch('dialogs/clearDialog')
            if(this.dialogId) {
                var data = {
                    dialogId: this.dialogId
                }

                store.dispatch('dialogs/getDialog', data)
                store.dispatch('dialogs/getMessages', data)
            }
        },
        firstParticipant(participants) {
            var _this = this;
            
            if(participants) {
                var participant = participants.filter(function(item) {
                    return item.user.id != _this.authUser.id
                });
                
                return participant[0].user;
            }
        },
        openInfo() {
            this.infoOpened = !this.infoOpened;
        }
    },
    beforeDestroy () {
        store.dispatch('dialogs/clearDialog')
    }
}
</script>
