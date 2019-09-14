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
        'participants'
    ],
    data() {
        return {
            baseURL: window.baseURL,
            message: {
                dialog_id: null,
                message: '',
                participants: []
            }
        }
    },
    watch: {
        'message.message': function (val, oldVal) {
            /*
            if(this.message.dialog_id != null) {
                var channelName = 'dialog_id.' + this.message.dialog_id;
                
                Echo.private(channelName)
                    .whisper('typing', {
                        message: this.message.message
                    });
            }
            */
        }
    },
    mounted() {
        this.message.dialog_id = this.dialogId
        this.message.participants = this.participants
        
        var textarea = document.querySelector("textarea")
        textarea.focus();
    },
    methods: {
        send() {
            var _this = this;
            this.message.dialog_id = this.dialogId
            var data = this.message;

            if(data.message == '') {
                return;
            }

            if(this.message.dialog_id != null) {
                store.dispatch('dialogs/sendMessage', data)
                    .then(function(response) {
                        _this.message.message = '';
                        var content = document.querySelector(".content")
                        content.scrollTo(0, content.scrollHeight)
                    }).catch((error => {

                    }))
            }
            else {
                store.dispatch('dialogs/newDialog', data)
                    .then(function(response) {
                        _this.message.message = '';
                        _this.$router.push({ name: 'dialog', params: {dialogId:response.id} })
                    }).catch((error => {

                    }))
            }
        }
    }
}
</script>
