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
        selectItem(item){
            this.selectedText = item.name
            this.showList = false;
            this.onSelect ? this.onSelect(item) : null
        },
    }
}

</script>
<style>
    .autocomplete {
        position: relative;
        width: 100%;
    }
    .autocomplete .autocomplete-list {
        position: relative;
    }
    .autocomplete .autocomplete-list ul {
        position: absolute;
        width: 100%;
        top: 0.1rem;
        padding: 0.5rem 0;
        z-index: 1;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
    }
    .autocomplete .autocomplete-list .autocomplete-list-item {
        cursor: pointer;
        list-style: none;
        padding: 0.1rem 1rem;
    }
    .autocomplete .autocomplete-list .autocomplete-list-item:hover {
        background-color: #eee;
    }
</style>
