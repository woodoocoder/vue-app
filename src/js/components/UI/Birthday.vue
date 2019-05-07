<template>
    <div>
        <label>Birthday</label>

        <div class="row">
            <div class="col-12 col-sm-4">
                <vue-select
                    :title="'Date'"
                    v-model="dates"
                    :selected="selected.date"
                    :onSelect="dateSelected"
                    :placeholder="'Date'"/>
            </div>
            <div class="col-12 col-sm-4">
                <vue-select
                    :title="'Month'"
                    v-model="months"
                    :selected="selected.month"
                    :onSelect="monthSelected"
                    :placeholder="'Month'"/>
            </div>
            <div class="col-12 col-sm-4">
                <vue-select
                    :title="'Year'"
                    v-model="years"
                    :selected="selected.year"
                    :onSelect="yearSelected"
                    :placeholder="'Year'"/>
            </div>
        </div>
    </div>
</template>



<script>
import VueSelect from '../UI/Select.vue';

export default {
    components: {
        VueSelect
    },
    props: {
        value: Array,
        id: String,
        name: String,
        title: String,
        placeholder: String,
        required: Boolean,

        onSelect: Function,
    },
    data() {
        return {
            minimumYears: 16,
            currentYear: null,
            lastYear: null,
            dates: [],
            months: [
                {value: 1, text: 'January'},
                {value: 2, text: 'February'},
                {value: 3, text: 'March'},
                {value: 4, text: 'April'},
                {value: 5, text: 'May'},
                {value: 6, text: 'June'},
                {value: 7, text: 'July'},
                {value: 8, text: 'August'},
                {value: 9, text: 'September'},
                {value: 10, text: 'October'},
                {value: 11, text: 'November'},
                {value: 12, text: 'December'},
            ],
            years: [],
            selected: {
                date: null,
                month: null,
                year: null
            }
        }
    },
    mounted() {
        this.currentYear = this.$moment().format('YYYY'),
        this.genYears()
        this.genDays()
    },
    methods: {
        dateSelected: function(date) {
            this.selected.date = date;

            this.selectedDate()
        },
        monthSelected: function(month) {
            this.selected.month = month;
            this.genDays()

            this.selectedDate()
        },
        yearSelected: function(year) {
            this.selected.year = year;
            this.genDays()

            this.selectedDate()
        },
        selectedDate() {
            if(this.onSelect) {
                var day = this.selected.date ? this.selected.date.value: null,
                    month = this.selected.month ? this.selected.month.value: null,
                    year = this.selected.year ? this.selected.year.value: null;

                if(year && month && day) {
                    this.onSelect(
                        this.$moment(year+'-'+(month<=9?'0':'')+month+'-'+(day<=9?'0':'')+day)
                        .format('YYYY-MM-DD'));
                }
            }
        },
        genDays() {
            var year = (!this.selected.year || !this.selected.year.value)? this.lastYear : this.selected.year.value;
            var month = (!this.selected.month || !this.selected.month.value)? 1 : this.selected.month.value;
            var maxDays = this.$moment(year+'-'+month, 'YYYY-MM').daysInMonth()

            if(this.selected.date && this.selected.date.value > maxDays) {
                this.selected.date = {
                    value: maxDays, text: maxDays
                }
            }

            this.dates = [];
            for (var i = 1; i<=maxDays; i++) {
                this.dates.push({
                    value: i, text: i
                });
            }
        },
        genYears() {
            this.lastYear = this.currentYear-this.minimumYears,

            this.years = [];
            for (var i = 0;i<=100; i++) {
                this.years.push({
                    value: this.lastYear-i, text: this.lastYear-i
                });
            }
        }
    }
}
</script>
