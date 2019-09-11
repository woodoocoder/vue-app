<template>
    <div class="messages">
        <div class="row header">
            <div class="col-2 text-center">
                <router-link :to="{ name: 'dialogs' }" class="back-link">
                    <font-awesome-icon icon="chevron-left" />
                </router-link>
            </div>
            <div class="col-8 text-center subject">
                {{ dialog.subject }}
            </div>
            <div class="col-2 text-center">
                <router-link :to="{ name: 'dialogs' }" class="info-link">
                    <font-awesome-icon icon="info-circle" />
                </router-link>
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
                            {{ item.created_at | moment("DD.MM.YY") }}
                        </span>
                    </div>
                </div>
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
            participants: []
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
        user() {
            return store.getters['auth/user']
        }
    },
    watch: {
        '$route': 'lodadData',
        messages: function(val) {
            setTimeout(() => this.scrollBottom(), 100)
        },
    },
    mounted() {
        this.lodadData()
    },
    methods: {
        isMyMessage(message) {
            return (this.user.id == message.user.id)? true : false;
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
                    .then(function(response) {
                        _this.scrollBottom()
                    }).catch((error => {

                    }))
            }
        }
    }
}
</script>
