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
                        {{ item.message }}
                        <span class="date">
                            {{ item.created_at | moment("DD.MM.YY") }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
       <message-form :dialogId="dialogId"/>
    </div>
</template>

<script>
import store from '../../store'
import MessageForm from './MessageForm.vue'

export default {
    data() {
        return {
            baseURL: window.baseURL,
            dialogId: null
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
    created () {
        var _this = this;
        this.dialogId = this.$route.params.dialogId
        var data = {
            dialogId: this.dialogId
        }

        store.dispatch('dialogs/getDialog', data);
        store.dispatch('dialogs/getMessages', data)
            .then(function(response) {
                _this.firstLoad()
            }).catch((error => {
            }))
    },
    methods: {
        isMyMessage(message) {
            return (this.user.id == message.user_id)? true : false;
        },
        firstLoad() {
            var content = document.querySelector(".content")
            content.scrollTo(0, content.scrollHeight)
        }
    }
}
</script>
