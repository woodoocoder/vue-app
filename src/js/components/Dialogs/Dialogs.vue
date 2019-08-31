<template>
    <div class="dialogs">
        <div class="row dialog"
            v-for="item in dialogs"
            v-bind:item="item" :key="item.id" @click="openDialog(item.id)">
                <div class="col-2">
                    
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-8 subject" v-text="item.subject"></div>
                        <div class="col-4">
                            <span class="date text-light float-right">
                                {{ item.created_at | moment("DD.MM.YY") }}
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            last message last message
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import store from '../../store'

export default {
    data() {
        return {
            baseURL: window.baseURL
        }
    },
    computed: {
        dialogs() {
            return store.getters['dialogs/dialogs']
        }
    },
    methods: {
        openDialog(dialogId) {
            this.$router.push({ name: 'dialog', params: { dialogId:dialogId } })
        },
    }
}
</script>
