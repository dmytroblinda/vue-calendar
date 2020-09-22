<template>
    <div class="calendar-view">
        <div class="calendar__navigate month d-flex">
            <div class="btn btn-default btn-sm month__prev" @click="changeMonth(month-1)"></div>
            <div class="month__now">
                {{monthes[month]}}, {{year}}
            </div>
            <div class="btn btn-default btn-sm month__next" @click="changeMonth(month+1)"></div>
            <div class="btn btn-default btn-sm today" @click="goToday">Сегодня</div>
        </div>
        <div class="calendar__view" >
            <calendar-day v-for="(item,i) in calendar()" :key="i" :item="item" :index="i" :events="getEventsForDay(item.date)" @show-day-modal="showDate(item.date)" />
        </div>
    </div>
</template>

<script>
    import CalendarDay from "@/components/calendar/CalendarDay";

    export default {
        name: "Calendar",
        components: {CalendarDay},
        props: {
            events: {
                type: Array,
                required: false
            },
        },
        data() {
            return {
                today: new Date(),
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
                monthes:["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                date: new Date(),
                activeDate: '',
            }
        },
        methods:{
            calendar() {
                let days = [];
                let lastDayNumber = new Date(this.year, this.month+1, 0).getDate();
                let firstDay = new Date(this.year, this.month, 1).getDay();
                let lastDay = new Date(this.year, this.month, lastDayNumber).getDay();
                firstDay = firstDay === 0 ? 7 : firstDay;
                 for (let i = 0; i < firstDay-1; i++) {
                    days.push({day: null})
                }
                for (let i = 1; i <= lastDayNumber; i++) {
                    let a = {
                        day:i,
                        date: this.year+'-'+(this.month+1+'').padStart(2, '0')+'-'+(''+i).padStart(2, '0')
                    };
                    days.push(a);
                }
                for(let i=lastDay; i < 7 && i>0; i++ ) {
                    days.push({day: null})
                }
                return days;
            },
            changeMonth(monthIndex) {
                if ( monthIndex >= 12 ) {
                    monthIndex = 0;
                    this.year++;
                } else if (monthIndex < 0) {
                    monthIndex = 11;
                    this.year--;
                }
                this.month = monthIndex;
            },
            goToday() {
                this.month = this.today.getMonth();
                this.year = this.today.getFullYear();
            },
            getEventsForDay(day) {
                return day ? this.events.filter(item => item.date === day) : []
            },
            showDate(item) {
                this.$emit('active-date',item);
            },
        }
    }
</script>

<style scoped lang="scss">

    .calendar__navigate {
        margin-bottom: 10px;

        .month__prev:before,
        .month__next:before {
            content: '';
            display: block;
            border-right: 5px solid #000;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            margin: 4px 2px 4px 0;
        }
        .month__next:before {
            transform: rotate(180deg);
        }

        .month__now {
            margin: 0 15px;
            line-height: 30px;
            min-width: 130px;
            text-align: center;
        }
        .today {
            margin-left: 20px;
        }
    }
    .calendar__view {
        display: flex;
        flex-wrap: wrap;
    }


    @media (max-width: 700px) {
        .calendar__navigate {
            .month__now {
                margin: 0 10px;
            }
            .today {
                margin-left: auto;
            }
        }
    }

</style>