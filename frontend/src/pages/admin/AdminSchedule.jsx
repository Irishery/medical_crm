import { Scheduler } from "@aldabil/react-scheduler";
import { ru } from "date-fns/locale"


const EVENTS = [
    {
      event_id: 1,
      title: "Приём",
      start: new Date(2024, 10, 11, 12, 0, 0, 0),
      end: new Date(2024, 10, 11, 14, 0, 0, 0),
      editable: true
    },
]


async function fetchRemote(query) {
    console.log({ query })

    return new Promise((res) => {
        setTimeout(() => {
            res(EVENTS)
        }, 3000)
    })
}


async function handleConfirm(event, action) {
    console.log("handleConfirm =", action, event.title);

    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
        if (action === "edit") {
            /** PUT event to remote DB */
        } else if (action === "create") {
            /**POST event to remote DB */
        }

        const isFail = false;
        // Make it slow just for testing
        setTimeout(() => {
            if (isFail) {
                rej("Ops... Faild");
            } else {
                res({
                    ...event,
                    event_id: event.event_id
                })
            }
        }, 3000)
    })
}


async function handleDelete(deletedId) {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(deletedId);
        }, 3000)
    })
}


function AdminSchedule() {
    return <Scheduler
        getRemoteEvents = { fetchRemote }
        onConfirm       = { handleConfirm }
        onDelete        = { handleDelete }

        week = {{ 
            weekDays: [0, 1, 2, 3, 4], 
            weekStartOn: 1, 
            startHour: 8, 
            endHour: 19,
            step: 30,
            navigation: true,
            disableGoToDay: false
        }}

        translations = {{
            navigation: {
                month: "Месяц",
                week: "Неделя",
                day: "День",
                today: "Сегодня",
                agenda: "Агенда"
            },
            form: {
                addTitle: "Добавить",
                editTitle: "Изменить",
                confirm: "Подтвердить",
                delete: "Удалить",
                cancel: "Отмена"
            },
            event: {
                title: "Заголовок",
                subtitle: "Описание",
                start: "Начало",
                end: "Конец",
                allDay: "Весь день"
            },
            validation: {
                required: "Обязательно",
                invalidEmail: "Неправильная почта",
                onlyNumbers: "Только цифры",
                min: "Минимум {{min}} букв",
                max: "Максимум {{max}} букв"
            },
            moreEvents: "Больше",
            noDataToDisplay: "Пусто",
            loading: "Загрузка..."
        }}

        hourFormat = { 24 }
        locale = { ru }
    />
}

export default AdminSchedule