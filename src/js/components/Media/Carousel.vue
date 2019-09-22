<template>
    <div class="row">
        <div class="col-12">
            <slick
                ref="slick"
                :options="slickOptions">
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
                <a href="http://placehold.it/150x150"><img src="http://placehold.it/150x150" alt=""></a>
            </slick>

        </div>
    </div>
</template>

<script>
import Slick from 'vue-slick';

export default {
    components: {
        Slick
    },
    data() {
        return {
            slickOptions: {
                infinite: true,
                dots: false,
                slidesToShow: 6,
                slidesToScroll: 6,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 6,
                            slidesToScroll: 6
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            },
        };
    },
    methods: {
        
    },
}
</script>
