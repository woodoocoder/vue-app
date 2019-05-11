<template>
    <div class="card">
        <img class="card-img-top" :src="baseURL+user.avatar_url" :alt="user.firstname">
        
        <div class="card-body" style="padding:10px;">
            {{ user.firstname }}
        </div>
    </div>
</template>

<script>

export default {
    props: {
        user: Object,
    },
    data() {
        return {
            baseURL: window.baseURL
        }
    },
    mounted() {
        
    }
}
</script>
