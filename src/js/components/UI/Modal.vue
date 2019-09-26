<template>
<div v-if="showModal" name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div v-if="hasSlot('header')" class="modal-header">
                    <slot name="header"></slot>

                    <span class="float-right close-btn">
                        <font-awesome-icon icon="times"  @click="$emit('close')"/>
                    </span>
                </div>

                <div :style="css.body" class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div v-if="hasSlot('footer')" class="modal-footer">
                    <slot name="footer"></slot>
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
            css: {
                body: {}
            }
        }
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
        keyupEsc(evt) {
            if (evt.keyCode === 27) {
                this.$emit('close');
            }
        }
    },
    beforeMount () {
        document.addEventListener('keyup', this.keyupEsc);
    },
    beforeDestroy () {
        window.removeEventListener('keyup', this.keyupEsc);
    }
}

</script>

