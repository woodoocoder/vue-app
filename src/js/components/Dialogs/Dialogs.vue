<template>
    <div class="dialogs">
        <div class="row dialog"
            v-for="item in dialogs"
            v-bind:item="item" :key="item.id" @click="openDialog(item.id)">
                <div class="col-2">
                    <div v-if="item.latest_message">
                        <avatar :user="firstParticipant(item.participants)" size="40" :rounded="true" />
                    </div>
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-8 subject">
                            {{firstParticipant(item.participants).firstname}}
                        </div>
                        <div class="col-4">
                            <span class="date text-light float-right">
                                {{ item.updated_at | moment("DD.MM H:mm") }}
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div v-if="item.latest_message">
                                {{item.latest_message.message}}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import store from '../../store'
import Avatar from '../User/Avatar.vue'

export default {
    data() {
        return {
            baseURL: window.baseURL
        }
    },
    components: {
        Avatar
    },
    computed: {
        dialogs() {
            return store.getters['dialogs/dialogs']
        },
        authUser() {
            return store.getters['auth/user']
        },
    },
    methods: {
        openDialog(dialogId) {
            this.$router.push({ name: 'dialog', params: { dialogId:dialogId } })
        },
        firstParticipant(participants) {
            var _this = this;
            var participant = participants.filter(function(item) {
                return item.user.id != _this.authUser.id
            });
            
            return participant[0].user;
        }
    }
}
</script>
