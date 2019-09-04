<template>
    <div class="user-avatar">
        <avatar :username="user.firstname+' '+user.lastname" :size="parseInt(size)" :rounded="(rounded!== undefined)?rounded:false"/>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    props: ['user', 'size', 'rounded'],
    data() {
        return {
            baseURL: window.baseURL
        }
    },
    components: {
        Avatar
    },
    mounted() {
        
    }
}
</script>
