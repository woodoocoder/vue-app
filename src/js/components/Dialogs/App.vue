<template>
    <div class="dialogs">
        <div class="row">
            <div v-if="!dialogId || windowWidth >= 575" class="col-12 col-sm-5 col-md-4">
                <dialogs />
            </div>

            <div class="col-sm-7 col-md-8">
                <div v-if="dialogId">
                    <messages />
                </div>
                <div v-else-if="windowWidth >= 575">
                    <h2 class="text-center mt-4">Plase select a chat</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../store'
import Dialogs from './Dialogs.vue'
import Messages from './Dialog.vue'

export default {
    data() {
        return {
            windowWidth: window.innerWidth,
            dialogId: null
        }
    },
    components: {
        Dialogs,
        Messages
    },
    watch: {
        '$route': 'lodadData',
    },
    mounted() {
        this.lodadData()
    },
    methods: {
        lodadData() {
            this.dialogId = this.$route.params.dialogId
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
    }
}
</script>
