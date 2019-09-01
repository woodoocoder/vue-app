<template>
    <div class="row">
        <div class="col-12 message-form">
            <input
                class="form-control"
                ref="input"
                type="text"
                v-model="message.message"
                v-on:keyup.enter="send"
                autocomplete="off"/>
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
    },
    methods: {
        send() {
            var _this = this;
            var data = this.message;
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
