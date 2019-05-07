<template>
    <div class="form-group vue-select">
        <div class="form-control vue-select-input" @click.prevent="onClick">
            <span v-if="selectedText == ''" class="text-secondary">{{ title }}</span>
            <span v-else="">{{ selectedText }}</span>

            <span v-if="this.showList" class="float-right">X</span>
        </div>
            
        <div v-if="showList && items.length" class="vue-select-list">
            <ul>
                <li
                    class="vue-select-list-item"
                    v-for="item in items"
                    v-bind:item="item" :key="item.value" >
                    <div @click.prevent="selectItem(item)">
                        {{ item.text }}
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
        title: String,
        selected: String|Number,
        placeholder: String,
        required: Boolean,

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
            var _this = this;
            this.selectedText = this.selected.text

            this.items.forEach(function(item) {
                if(item.value == _this.selected.value) {
                    _this.selectItem(item);
                }
            });
        }
    },
    mounted() {
        var _this = this;
        this.items = this.value ? this.value : []
        
        if(this.selected) {
            this.items.forEach(function(item) {
                if(item.value == _this.selected.value) {
                    _this.selectItem(item);
                }
            });
        }

        if(this.required) {
            this.$refs.input.setAttribute("required", this.required)
        }
    },
    methods: {
        onClick(e) {
            e.preventDefault()
            this.showList = !this.showList;
        },
        selectItem(item){
            this.selectedText = item.text
            this.showList = false;
            this.onSelect ? this.onSelect(item) : null
        }
    }
}

</script>
<style>
    .vue-select {
        position: relative;
        width: 100%;
    }
    .vue-select .vue-select-list {
        position: absolute;
        max-height: 20rem;
        width: 100%;
        overflow-y: scroll;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        z-index: 1;
    }
    .vue-select .vue-select-list ul {
        position: relative;
        width: 100%;
        top: 0.1rem;
        padding: 0.5rem 0;
    }
    .vue-select .vue-select-list .vue-select-list-item {
        position: relative;
        cursor: pointer;
        list-style: none;
        padding: 0.1rem 1rem;
    }
    .vue-select .vue-select-list .vue-select-list-item:hover {
        background-color: #eee;
    }
</style>
