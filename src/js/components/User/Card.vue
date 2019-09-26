<template>
    <div class="card">
        <avatar :user="user" :size="365" />
        
        <div class="card-body user-card-body">
            {{ user.firstname }}
        </div>
    </div>
</template>

<script>
import Avatar from './Avatar.vue'

export default {
    props: {
        user: Object,
    },
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
