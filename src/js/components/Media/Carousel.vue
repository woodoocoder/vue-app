<template>
    <div class="row">
        <div v-if="userId == null || userId == authUser.id" class="col-12  mt-1 mb-1" id="upload-block">
            <div class="upload-btn text-primary" @click="showUploadModal=true">Upload new photo</div>
        </div>
        <div class="col-12">
            <slick
                ref="slick"
                :options="slickOptions">
                <div v-for="item in files"
                    v-bind:item="item" :key="item.id">
                    <img :src="item.src">
                </div>
            </slick>
        </div>

        <modal :showModal="showUploadModal" @close="showUploadModal = false">
            <template v-slot:header>
                <h3 class="text-center">Upload</h3>
            </template>
        </modal>
    </div>
</template>

<script>
import store from '../../store'
import Slick from 'vue-slick';
import Modal from '../UI/Modal';

export default {
    components: {
        Slick,
        Modal
    },
    data() {
        return {
            userId: null,
            showUploadModal: false,
            slickOptions: {
                infinite: true,
                dots: false,
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: true,
                prevArrow:"<button type='button' class='slick-prev'></button>",
                nextArrow:"<button type='button' class='slick-next'></button>",
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 6,
                            slidesToScroll: 6,
                            arrows: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            arrows: false
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: false
                        }
                    }
                ]
            },
        };
    },
    computed: {
        authUser() {
            return store.getters['auth/user']
        },
        user() {
            return store.getters['user/user'];
        },
        files() {
            return store.getters['media/files'];
        },
    },
    mounted() {
        this.userId = this.$route.params.userId

        //store.dispatch('media/getMedia', this.userId)
    },
    methods: {
        
    },
}
</script>
