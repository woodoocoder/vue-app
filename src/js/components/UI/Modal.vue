<template>
<div v-if="show" @click="show = false" name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div v-if="hasSlot('header')" class="modal-header">
                    <slot name="header"></slot>
                </div>

                <div :style="css.body" class="modal-body">
                    <slot name="body"></slot>
                </div>

                <div v-if="hasSlot('footer')" class="modal-footer">
                    <slot name="footer">
                        <button class="btn btn-sm btn-danger" @click="show = false">Close</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>

export default {
    props: {
        showModal: Boolean,
    },
    data() {
        return {
            show: false,
            css: {
                body: {}
            }
        }
    },
    watch: {
        showModal() {
            this.show = this.showModal
        },
    },
    mounted() {
        if(!this.hasSlot('header') && !this.hasSlot('footer')) {
            Object.assign(this.css.body, {top: '0', bottom: '0'});
        }
        else if(!this.hasSlot('header')) {
            Object.assign(this.css.body, {top: '0'});
        }
        else if(!this.hasSlot('footer')) {
            Object.assign(this.css.body, {bottom: '0'});
        }
    },
    methods: {
        hasSlot(name) {
            //<h3 class="text-center">Modal</h3>
            return !!this.$slots[name]
        },
    },
}

</script>

