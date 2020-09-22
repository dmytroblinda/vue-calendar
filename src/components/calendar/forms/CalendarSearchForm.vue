<template>
    <div class="search">
        <input type="search" class="search__input" v-model="search" placeholder="Событие, дата или участник">
        <div class="search__result" v-if="search.length > 0">
            <div class="search__list" v-if="filteredList.length > 0" >
                <div class="search__list-item" v-for="item in filteredList" @click="showEventDay(item.date)">
                    <div class="name">{{item.name}}</div>
                    <div class="date">{{item.date | returnDate}}</div>
                </div>
            </div>
            <div class="search__list-empty empty" v-else>
                К сожалению ничего не найдено =(
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CalendarSearchForm",
        props: {
           list: {
               type: Array,
               required: true
           }
        },
        data() {
            return {
                search: ''
            }
        },
        computed: {
            filteredList() {
                return this.list.filter(item => {
                    return item.name.toLowerCase().match(this.search.toLowerCase()) || this.$options.filters.returnDate(item.date).toLowerCase().match(this.search.toLowerCase()) || ( !!item.member && item.member.toLowerCase().match(this.search.toLowerCase()) )
                })
            }
        },
        methods: {
            showEventDay(date) {
                this.search = '';
                this.$emit('active-date', date)
            }
        }
    }
</script>

<style scoped lang="scss">
    .search {
        position: relative;


        .search__input {
            line-height: 30px;
            padding: 5px 10px 5px 40px;
            height: 40px;
            border: 1px solid #b6b6b6;
            border-radius: 3px;
            min-width: 240px;
            font-family: Arial, serif;
            font-size: 14px;
            background: #fff url(../../../assets/search.svg) no-repeat 10px 50%;
            background-size: 20px;

        }

        .search__result {
            position: absolute;
            right: 0;
            top: 100%;
            width: 100%;
            border: 1px solid #ccc;
            background: #fff;
            margin-top: 15px;
            box-shadow: 0 0 15px rgba(0,0,0,0.15);

            &:before {
                content: '';
                display: block;
                border-bottom: 12px solid #ccc;
                border-right: 12px solid transparent;
                border-left: 12px solid transparent;
                position: absolute;
                left: 19px;
                top: -12px;
            }
            &:after {
                content: '';
                display: block;
                border-bottom: 11px solid #fff;
                border-right: 11px solid transparent;
                border-left: 11px solid transparent;
                position: absolute;
                left: 20px;
                top: -10px;
            }
        }

        .search__list {
            max-height: 40vh;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 5px;
            width: 100%;

            .search__list-item {
                position: relative;
                padding: 10px 10px;
                border-bottom: 1px solid #ebebeb;
                overflow: hidden;
                cursor: pointer;

                &:hover {
                    background: #f1f1f1;
                }

                &:last-child {
                    border-bottom: 0;
                }

                .name {
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                .date {
                    color: #666666;
                    font-size: 12px;
                }
            }
        }

        .search__list-empty {
            padding: 15px 10px;
            text-align: center;
        }
    }

    @media (max-width: 700px) {
        .search .search__input {
            width: 96vw;
            font-size: 16px;
        }
    }
</style>