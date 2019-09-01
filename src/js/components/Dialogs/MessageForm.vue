<template>
    <div class="row">
        <div class="col-12 message-form">
            <textarea
                class="form-control"
                ref="input"
                type="text"
                rows="1"
                v-model="message.message"
                @keyup.enter.exact.prevent="send"
                autocomplete="off"/>

                <span v-if="message.message != ''" class="send-btn" @click="send">
                    <font-awesome-icon icon="paper-plane" />
                </span>
        </div>
    </div>
</template>

<script>
import store from '../../store'

export default {
    props: [
        'dialogId',
    ],
    data() {
        return {
            baseURL: window.baseURL,
            message: {
                dialog_id: null,
                message: ''
            }
        }
    },
    mounted() {
        this.message.dialog_id = this.dialogId

        var textarea = document.querySelector("textarea")
        textarea.focus();
    },
    methods: {
        send() {
            var _this = this;
            var data = this.message;

            if(data.message == '') {
                return;
            }

            store.dispatch('dialogs/sendMessage', data)
            .then(function(response) {
                _this.message.message = '';
                var content = document.querySelector(".content")
                content.scrollTo(0, content.scrollHeight)
            }).catch((error => {
            }))
        }
    }
}
</script>
