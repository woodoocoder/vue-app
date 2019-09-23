<template>
    <div class="form-group autocomplete">
        <input
            class="form-control autocomplete-input"
            ref="input"
            type="text"
            :id="id"
            :name="name"
            :placeholder="placeholder"
            v-model="selectedText"
            @focus="inputOnfocus"
            @input="handleInput"
            @keydown="handleKeyDown"
            autocomplete="off"/>
        
        <div v-if="showList && items.length" class="autocomplete-list">
            <ul>
                <li
                    class="autocomplete-list-item"
                    v-for="item in items"
                    v-bind:item="item" :key="item.id" >
                    <div @click.prevent="selectItem(item)">
                        {{ item.name }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>

export default {
    props: {
        value: Array,
        id: String,
        selected: Object,
        name: String,
        placeholder: String,
        required: Boolean,

        // Callbacks
        onFocus: Function,
        onEnterText: Function,
        onSelect: Function,
    },
    data() {
        return {
            items: [],
            showList: false,
            selectedText: ''
        }
    },
    watch: {
        value() {
            this.items = this.value
        },
        selected() {
            if(this.selected) {
                this.selectItem(this.selected);
            }
        }
    },
    mounted() {
        this.items = this.value ? this.value : []

        if (this.required) {
            this.$refs.input.setAttribute("required", this.required)
        }
    },
    methods: {
        inputOnfocus(e) {
            e.preventDefault()
            this.showList = true;
            this.onFocus ? this.onFocus(e) : null
        },
        handleInput(e){
            e.preventDefault()
            const { value } = e.target
            if(this.onEnterText) {
                this.showList = true;
                this.onEnterText(value)
            }
        },
        handleKeyDown(e){
            let key = e.keyCode;
            
            if(!this.showList) return

            const ENTER = 13
            const ESC = 27
            
            switch (key) {
                case ENTER:
                    e.preventDefault()
                    this.showList = false;
                    break;
                case ESC:
                    this.showList = false;
                    break;
            }
        },
        selectItem(item){
            this.selectedText = item.name
            this.showList = false;
            this.onSelect ? this.onSelect(item) : null
        },
    }
}

</script>

