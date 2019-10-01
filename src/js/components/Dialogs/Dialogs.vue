<template>
    <div class="dialogs mt-1">
        <div class="row dialog"
            v-for="item in dialogs"
            v-bind:item="item" :key="item.id" @click="openDialog(item.id)">
            <div class="col-2 pt-1">
                <div v-if="item.latest_message">
                    <avatar :user="firstParticipant(item.participants)" size="40" :rounded="true" />
                </div>
            </div>
            <div class="col-10">
                <div class="row">
                    <div class="col-7 subject">
                        {{firstParticipant(item.participants).firstname|truncate(18)}}
                    </div>
                    <div class="col-5">
                        <span class="date text-light float-right">
                            {{ item.updated_at|formatDate|diffForHumans }}
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="last-message" v-if="item.latest_message">
                            {{item.latest_message.message|truncate(24)}}

                            <span v-if="countUnread(item) > 0" class="counter float-right">
                                {{countUnread(item)}}
                            </span>
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
            var items = store.getters['dialogs/dialogs']
            return items.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        },
        authUser() {
            return store.getters['auth/user']
        },
        unreadDialogs() {
            return store.getters['dialogs/unreadDialogs']
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
        },
        countUnread(dialog) {
            for(let i=0; i<this.unreadDialogs.length; i++) {
                if(dialog.id === this.unreadDialogs[i].id) {
                    return this.unreadDialogs[i].unread_messages
                }
            }
            return 0;
        }
    }
}
</script>
