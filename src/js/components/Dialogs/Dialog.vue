<template>
    <div v-if="!objectIsEmpty(dialog) || !dialogId" class="messages">
        <div class="row header">
            <div class="col-2 text-center" >
                <div v-if="parseInt(windowWidth) < 575">
                    <router-link :to="{ name: 'dialogs' }" class="back-link">
                        <font-awesome-icon icon="chevron-left" />
                    </router-link>
                </div>
            </div>
            <div class="col-8 text-center subject">
                <div v-if="dialog.participants">
                    {{firstParticipant(dialog.participants).firstname}}
                </div>
                <div v-else="">
                    New Dialog
                </div>
            </div>
            <div v-if="dialog.participants" @click="showInfoModal=true" class="col-2 text-center">
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
                            {{ item.created_at|formatDate|diffForHumans }}
                        </span>
                    </div>
                </div>
            </div>

            <div v-if="lastTyping" :class="isTyping">
                typing...
            </div>
            <message-form :dialogId="dialogId" :participants="participants"/>
        </div>

        <modal :showModal="showInfoModal" @close="showInfoModal = false">
            <template v-slot:header>
                <h3 class="text-center">Information</h3>
            </template>
            <template v-slot:body>
                <div class="col-12 col-sm-8 offset-sm-2">
                    <div v-for="item in dialog.participants"
                        v-bind:item="item" :key="item.id" class="row">
                        <div v-if="authUser.id!=item.user.id" class="col-12 mt-2">
                            <div class="row">
                                <div @click="openProfile(item.user.id)" class="col-3 col-sm-2">
                                    <avatar :user="item.user" size="60" :rounded="true" />
                                </div>
                                <div @click="openProfile(item.user.id)" class="col-5 pt-2">
                                    <h5>{{item.user.firstname}}</h5>
                                </div>
                                <div class="col-4 pt-4 text-danger">Block user</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="row">
                            <div class="col-6">Created:</div>
                            <div class="col-6">{{ dialog.created_at | formatDate(null, 'YYYY-MM-DD HH:mm') }}</div>
                        </div>
                        <div class="row">
                            <div class="col-6">Massages:</div>
                            <div class="col-6">{{ dialog.count_messages }}</div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <div class="row">
                            <div class="col-12 text-danger">Clear history</div>
                            <div class="col-12 text-danger">Delete conversation</div>
                        </div>
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../UI/Modal';
import Avatar from '../User/Avatar.vue'
import store from '../../store'
import MessageForm from './MessageForm.vue'

export default {
    props: ['userId'],
    data() {
        return {
            baseURL: window.baseURL,
            windowWidth: window.innerWidth,
            showInfoModal: false,
            dialogId: null,
            participants: [],
            lastTyping: null,
            timer: null,
        }
    },
    components: {
        Modal,
        Avatar,
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

            if(!this.participants[0]) {
                this.participants[0] = this.userId;
            }

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
        openProfile(userId) {
            this.$router.push({ name: 'view-profile', params: { userId:userId } })
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
    },
    beforeMount () {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.handleResize);
        store.dispatch('dialogs/clearDialog')
    }
}
</script>
