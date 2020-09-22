<template>
    <div class="day" :class="[events.length > 0 ? 'has-events':'', item.date === today ? 'today':'', events.length > 3 ? 'has-more':'']" @click="showDateModal">
        <div class="number">
            <span v-if="index < 7" :class="item.day === null ? 'no-this-month':''">{{ day[index] }}</span> {{item.day}}
            <i class="count" v-if="events.length > 0">{{events.length}}</i>
        </div>
        <div class="events" v-if="events.length > 0">
            <div class="event" v-for="event in events">
                <div class="event__name">{{event.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CalendarDay",
        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type:  Number,
                required: true
            },
            events: {
                type: Array,
                required: false
            }
        },
        data() {
            return {
                day:["Понедельник", "Вторник","Среда","Четверг","Пятница","Суббота", "Воскресенье"],
                today: new Date().getFullYear()+'-'+(new Date().getMonth()+1+'').padStart(2, '0')+'-'+ (new Date().getDate()+'').padStart(2, '0')
            }
        },
        methods: {
            showDateModal() {
                if (!!this.item.day) {
                    this.$emit('show-day-modal')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .day {
        width: calc(100%/7);
        font-size: 12px;
        position: relative;
        height: 120px;
        border: 1px solid #ebebeb;
        margin: 0 -1px -1px 0;

        &.has-events {
            background: #c2e4fe;
            cursor: pointer;
        }
        &.today {
            border: 2px solid #1b1e37;
            z-index: 2;
        }
        &.has-more {
            &:after {
                content: '...';
                display: block;
                padding: 0 10px;
                line-height: 2px;
                font-size: 18px;
            }
        }

        .number {
            padding: 8px 10px;
            line-height: 14px;
            color: #999999;
            display: flex;
            align-items: center;
            height: 30px;

            span{
                &:after {
                    content: ',';
                }
                &.no-this-month:after {
                    content: '';
                }
            }
            .count {
                margin-left: auto;
                background: #1B1E37;
                color: #fff;
                line-height: 18px;
                height: 18px;
                width: 18px;
                display: block;
                border-radius: 50%;
                text-align: center;
                font-style: normal;
            }
        }
        .events {
            height: 72px;
            line-height: 18px;
            padding: 0 5px;
            color: #1B1E37;
            overflow: hidden;

            .event {
                padding: 3px 5px;
                line-height: 1.1;
                border: 1px solid #1B1E37;
                border-radius: 2px;
                margin-bottom: 3px;

                .event__name {
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .day-modal {
        position: absolute;
        left: 100%;
        top: 0;
        background: #fff;
        box-shadow: 0 0 15px rgba(0,0,0,0.15);
        border: 1px solid #ccc;
        z-index: 6;
        width: 300px;

        &:before {
            content: '';
            display: block;
            border-right: 12px solid #ccc;
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            position: absolute;
            left: -12px;
            top: 19px;
        }
        &:after {
            content: '';
            display: block;
            border-right: 11px solid #fff;
            border-top: 11px solid transparent;
            border-bottom: 11px solid transparent;
            position: absolute;
            left: -10px;
            top: 20px;
        }

        .list-events {
            padding: 5px 15px;
            width: 300px;
            max-height: 340px;
            overflow: auto;
            background: #fff;
        }
    }
    
    @media (max-width: 1000px) {
        .day {
            .number {
                padding: 8px 4px;
            }
            .events {
                .event {
                    font-size: 11px;
                    word-break: break-word;
                    padding: 2px 4px;
                    line-height: 15px;

                    .event__name {
                        font-weight: 500;
                    }
                }
            }
        }
    }
    @media (max-width: 700px) {
        .day {
            height: 70px;

            &.has-more:after {
                display: none;
            }

            .events {
                display: none;
            }
            .number {
                > span {
                    display: none;
                }
            }
        }
    }
</style>