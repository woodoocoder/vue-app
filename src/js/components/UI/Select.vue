<template>
    <div class="form-group vue-select">
        <div class="form-control vue-select-input" @click.prevent="onClick">
            <span v-if="selectedText == ''" class="text-secondary">{{ title }}</span>
            <span v-else="">{{ selectedText }}</span>

            <span v-if="this.showList" class="close">X</span>
        </div>
            
        <div v-if="showList && items.length" class="vue-select-list">
            <ul>
                <li
                    class="vue-select-list-item"
                    v-for="item in items"
                    v-bind:item="item" :key="item[valueField]" >
                    <div @click.prevent="selectItem(item)">
                        {{ item[textField] }}
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
        options: Array,
        id: String,
        name: String,
        title: String,
        selected: String|Number,
        placeholder: String,
        required: Boolean,

        valueField: {
            type: String,
            default: 'value'
        },
        textField: {
            type: String,
            default: 'text'
        },

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
        options() {
            this.items = this.options
        },
        selected() {
            if(this.selected) {
                var _this = this;
                this.selectedText = this.selected[this.textField]
                
                this.items.forEach(function(item) {
                    if(item[_this.valueField] == _this.selected[_this.valueField]) {
                        _this.selectedText = item[_this.textField]
                        _this.showList = false;
                    }
                });
            }
        }
    },
    mounted() {
        var _this = this;

        if(this.value) {
            this.items = this.value
        }
        else if(this.options) {
            this.items = this.options
        }
        else {
            this.items = [];
        }

        if(this.selected) {
            this.items.forEach(function(item) {
                if(item[_this.valueField] == _this.selected[_this.valueField]) {
                    _this.selectedText = item[_this.textField]
                    _this.showList = false;
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
            this.selectedText = item[this.textField]
            this.showList = false;

            if(this.name) {
                item.key = this.name
            }
            
            this.onSelect ? this.onSelect(item) : null
        }
    }
}

</script>
