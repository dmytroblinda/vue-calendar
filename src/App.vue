<template>
  <div id="app">

    <div class="calendar">
      <div class="calendar__header">
        <div class="wrap d-flex align-items-center space-between">
          <div class="calendar__actions d-flex">
            <div class="calendar__actions-create">
              <div class="btn btn-primary" @click="showAddForm = !showAddForm">Добавить</div>
              <calendar-event-form :form="formEvent" class="add-form" @close="closeAddForm" @send="saveEvent" v-if="showAddForm" />
            </div>
            <div class="calendar__actions-update">
              <div class="btn btn-primary">Обновить</div>
            </div>
          </div>
          <calendar-search-form class="calendar__search" :list="events" @active-date="showDate" />
        </div>
      </div>
      <div class="calendar__body">
        <div class="wrap">
          <calendar :events="events" @save-event="saveEvent" @remove-event="removeEvent" @active-date="showDate" />
        </div>
      </div>
    </div>

    <calendar-modal-date v-if="activeDate"
                         :date="activeDate" :events="events"
                         @save-event="saveEvent" @remove-event="removeEvent" @close="activeDate=''"/>

  </div>
</template>

<script>
import Calendar from '@/components/calendar/Calendar'
import CalendarModalDate from "@/components/calendar/CalendarModalDate";
import CalendarEventForm from '@/components/calendar/forms/CalendarEventForm'
import CalendarSearchForm from '@/components/calendar/forms/CalendarSearchForm'

export default {
  name: 'App',
  components: {
    Calendar, CalendarModalDate, CalendarEventForm, CalendarSearchForm
  },
  data() {
    return {
      activeDate: '',
      showAddForm: false,
      searchEvent: '',
      formEvent: {
        name: '',
        date: '',
        member: '',
        description: '',
      },
      events: [
        {
          id: '1600717511549',
          name: 'День программиста',
          date: '2020-09-12',
          description: 'Отпраздновать',
        },
        {
          id: '1600717511550',
          name: 'Собеседование с Дмитрий Блинда',
          date: '2020-09-21',
          member: 'Сергей Новицкий, Елена Свиридова, Дмитрий Блинда',
          description: 'Провести встречу в Google Meet',
        },
        {
          id: '1600717511551',
          name: 'Проверка тестового задания',
          date: '2020-09-22',
          member: 'Дмитрий Блинда',
          description: '',
        },
      ],
    }
  },
  computed: {
    searchEvents() {
      return this.events;
    }
  },
  methods: {
    closeAddForm() {
      this.showAddForm = false;
      this.formEvent = {name: '', date: '', member: '', description: ''};
    },
    showDate(item) {
      this.activeDate = item;
    },
    saveEvent(form) {
      if (!form.id) {
        form.id= Date.now();
        this.events.push(form);
      } else  {
        let index = this.events.findIndex(item => item.id === form.id);
        this.events.splice(index, 1, form)
      }
      this.updateStorage();
    },
    removeEvent(eventId) {
      let index = this.events.findIndex(item => item.id === eventId);
      this.events.splice(index, 1);
      this.updateStorage();
    },
    updateStorage() {
      localStorage.setItem('events', JSON.stringify(this.events) );
    }
  },
  mounted() {
    if (!!localStorage.getItem('events')) {
      this.events = JSON.parse(localStorage.getItem('events'))
    } else {
      localStorage.setItem('events', JSON.stringify(this.events) );
    }
  }
}
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    font-family: Helvetica, Arial, sans-serif;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .btn {
    padding: 5px 20px;
    border: 0;
    border-radius: 4px;
    line-height: 30px;
    font-size: 15px;
    cursor: pointer;
    box-shadow: 0 0 3px rgba(0,0,0,.15);
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &.btn-sm {
      padding: 5px 10px;
      line-height: 20px;
      font-size: 14px;
    }
    &.btn-primary {
      background: #1B1E37;
      color: #fff;
    }
  }
  .btn-group {
    display: flex;

    .btn {
      margin: 0 5px;
      flex: 1;

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .d-flex {
    display: flex;

    &.align-items-center {
      align-items: center;
    }
    &.space-between {
      justify-content: space-between;
    }

  }

  .wrap {
    width: 1000px;
    margin: 0 auto;
    max-width: 96%;
  }

  .empty {
    font-style: italic;
    padding: 15px 0;
    text-align: center;
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    .modal-backdrop {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0,0,0,0.4);
    }
    .modal-wrap {
      position: relative;
      z-index: 3;
      width: 400px;
      max-width: 94%;
      background: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .modal-body {
      max-height: 70vh;
      overflow-y: auto;
      padding: 20px;
    }
    .modal-header {
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #1B1E37;
      color: #fff;

      h4 {
        margin: 0;
        font-size: 21px;
      }
      .close-modal {
        display: block;
        width: 20px;
        height: 20px;
        background: url('assets/close.svg') no-repeat center;
        background-size: 70%;
        cursor: pointer;
      }
    }
  }

  .calendar {
    position: relative;

    .calendar__header {
      padding: 30px 0;
      background: #f4f4f4;
      box-shadow: 0 3px 5px rgba(0,0,0,0.12);
      position: relative;
      z-index: 10;
    }
    .calendar__body {
      padding: 30px 0;
    }
    .calendar__actions {
      .calendar__actions-create {
        position: relative;
        margin-right: 10px;

        .add-form {
          position: absolute;
          left: 0;
          top: 100%;
          padding: 20px;
          border: 1px solid #ccc;
          background: #fff;
          margin-top: 15px;
          box-shadow: 0 0 15px rgba(0,0,0,0.15);
          width: 300px;

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
      }
    }
    .calendar__search {

    }
  }

  @media (max-width: 700px) {
    .btn {
      line-height: 25px;

      &.btn-sm {
        padding: 5px 14px;
        line-height: 20px;
      }
    }

    .calendar {
      .calendar__header {
        padding: 10px 0;
        .wrap.d-flex {
          flex-wrap: wrap;
          justify-content: center;

          .calendar__search {
            order: 1;
            margin-bottom: 10px;
          }
        }
      }
      .calendar__actions {
        order: 2;
        width: 100%;
        display: flex;

        > div {
          flex: 1;
          .btn {
            width: 100%;
          }
        }

        .calendar__actions-create {
          .add-form {
            width: 96vw;
          }
        }
      }
      .calendar__body {
        padding: 20px 0;
      }
    }
  }
</style>
