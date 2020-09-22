<template>
    <form class="event-form" @submit.prevent="submitForm">
        <div class="item-form required">
            <input type="text" placeholder="Событие" v-model="form.name">
            <div class="error" v-if="validate && form.name.length === 0">Обязательное поле</div>
        </div>
        <div class="item-form required">
            <input type="date" name="date" data-date-format="DD.MM.YYYY" placeholder="День, месяц, год" v-model="form.date">
            <div class="error" v-if="validate && form.date.length === 0">Обязательное поле</div>
        </div>
        <div class="item-form required" >
            <input type="text" name="members" placeholder="Имена участников" v-model="form.member">
        </div>
        <div class="item-form" >
            <textarea name="description" placeholder="Описание" v-model="form.description"></textarea>
        </div>
        <div class="btn-group">
            <button class="btn btn-sm btn-primary">Сохранить</button>
            <button class="btn btn-sm" @click="closeForm">Отменить</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "CalendarEventForm",
        props: {
            form: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                validate: false,
            }
        },
        methods: {
            submitForm() {
                if (this.form.name.length > 0 && this.form.date.length > 0) {
                    this.$emit('send', this.form);
                    this.$emit('close')

                } else {
                    this.validate = true;
                }

            },
            closeForm() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped lang="scss">
    .item-form {
        margin: 0 0 12px;

        input {
            width: 100%;
            line-height: 24px;
            padding: 5px 10px;
            height: 34px;
            border: 1px solid #b6b6b6;
            border-radius: 3px;
            font-family: Arial, serif;
            font-size: 16px;
        }
        textarea {
            line-height: 18px;
            font-size: 16px;
            padding: 5px 10px;
            border: 1px solid #b6b6b6;
            border-radius: 3px;
            font-family: Arial, serif;
            resize: none;
            width: 100%;
            height: 100px;
        }
        .error {
            margin: 4px 0 0;
            font-size: 12px;
            color: red;
        }
    }

</style>