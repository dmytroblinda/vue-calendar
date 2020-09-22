<template>
    <div class="modal modal-date">
        <div class="modal-backdrop" @click="closeModal"></div>
        <div class="modal-wrap">
            <div class="modal-header">
                <h4>{{date | returnDate}}</h4>
                <div class="close-modal" @click="closeModal"></div>
            </div>
            <div class="modal-body">
                <div class="event-list" v-if="!form">
                    <div class="event" v-for="event in todayEvents">
                        <div class="event-view">
                            <div class="event__name">{{event.name}}</div>
                            <div class="event__date">{{event.date | returnDate}}</div>
                            <div class="event__member" v-if="event.member">{{event.member}}</div>
                            <div class="event__description" v-if="event.description">{{event.description}}</div>
                            <div class="event__actions">
                                <div class="btn btn-sm" @click="updateEvent(event)"><i class="icon-edit"></i></div>
                                <div class="btn btn-sm" @click="removeEvent(event.id)"><i class="icon-trash"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="empty" v-if="todayEvents.length === 0">
                        К сожалению еще нет событий на эту дату
                    </div>
                    <div class="create-event">
                        <span class="btn btn-primary" @click="createForm">Создать событие на {{date| returnDate}}</span>
                    </div>
                </div>
                <calendar-event-form v-else :form="form" @close="form = null" @send="saveEvent" class="event-create-form" />
            </div>
        </div>
    </div>
</template>

<script>
    import CalendarEventForm from "./forms/CalendarEventForm";

    export default {
        name: "CalendarModalDate",
        components: {CalendarEventForm},
        props: {
            events: {
                type: Array,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        },
        data() {
           return {
               form: null,
               copyModal: null
           }
        },
        computed: {
            todayEvents() {
                return this.date ? this.events.filter(item => item.date === this.date) : []
            }
        },
        methods: {
            closeModal() {
                this.$emit('close');
            },
            removeEvent(id) {
                this.$emit('remove-event',id);
            },
            updateEvent(event) {
                this.form = {...event};
            },
            createForm() {
                this.form = {
                    name: '',
                    date: this.date,
                    member: '',
                    description: ''
                }
            },
            saveEvent(form) {
                this.$emit('save-event', form);
            }
        }
    }
</script>

<style scoped lang="scss">

    .create-event {
        text-align: center;
        margin-top: 10px;
    }

    .event-create-form {
        margin-top: 10px;
    }

    .event-list {
        .event {
            padding: 10px 0;
            font-size: 15px;
            color: #5c5c5c;
            border-bottom: 1px solid #e8e8e8;

            &:first-child {
                padding-top: 0;
            }
            &:nth-last-child(2) {
                border-bottom: 0;
            }

            .event-view {
                > div {
                    display: flex;
                    margin-bottom: 4px;

                    &:before {
                        content: '';
                        display: block;
                        min-width: 16px;
                        max-width: 16px;
                        height: 16px;
                        margin-right: 8px;
                    }
                }
            }

            .event__name {
                font-weight: 600;
                color: #000;
                font-size: 16px;

                &:before {
                    background: url(../../assets/star.svg) no-repeat center;
                    background-size: contain;
                }
            }
            .event__date {
                &:before {
                    background: url(../../assets/calendar.svg) no-repeat center;
                    background-size: contain;
                }
            }
            .event__member {
                &:before {
                    background: url(../../assets/user.svg) no-repeat center;
                    background-size: contain;
                }
            }
            .event__description {
                &:before {
                    background: url(../../assets/hastag.svg) no-repeat center;
                    background-size: contain;
                }
            }
            .event__actions {
                margin-top: 5px;
                text-align: right;
                justify-content: flex-end;

                &:before {
                    display: none;
                }

                .btn {
                    margin-left: 5px;

                    i {
                        display: block;
                        width: 16px;
                        height: 20px;

                        &.icon-edit {
                            background: url(../../assets/pencil.svg) no-repeat center;
                            background-size: contain;
                        }
                        &.icon-trash {
                            background: url(../../assets/trash.svg) no-repeat center;
                            background-size: contain;
                        }
                    }
                }
            }
        }
    }

</style>