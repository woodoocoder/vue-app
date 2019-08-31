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
        <div class="row message"
            v-for="item in messages"
            v-bind:item="item" :key="item.id">
            <div class="col-12">
                <span class="date text-light float-right">
                    {{ item.created_at | moment("DD.MM.YY") }}
                </span>
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../store'

export default {
    props: {
        dialogId: Number,
    },
    data() {
        return {
            baseURL: window.baseURL
        }
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
        var data = {
            dialogId: this.$route.params.dialogId
        }

        store.dispatch('dialogs/getDialog', data);
        store.dispatch('dialogs/getMessages', data);
    },
}
</script>
