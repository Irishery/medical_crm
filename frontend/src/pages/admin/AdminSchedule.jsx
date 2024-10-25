import { Scheduler } from "@aldabil/react-scheduler";
import { ru } from "date-fns/locale"
import { useState } from "react";
import Modal from "react-modal";


const EVENTS = [
    {
        event_id: 1,
        admin_id: 1,
        title: "Приём",
        start: new Date(2024, 9, 18, 12, 0, 0, 0),
        end: new Date(2024, 9, 18, 14, 0, 0, 0),
        editable: true
    },
]

console.log(EVENTS)

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
                rej("Oops... Failed");
            } else {
                res({
                    ...event,
                    title: `${event.patient}`,

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
    const [medcardModal, setMedcardModal] = useState(false)

    return (<>
        <Modal
            isOpen         = { medcardModal }
            onRequestClose = { () => setMedcardModal(false) }
            style          = {{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "10px"
                }
              }}
              contentLabel = "Медкарта"
        >

        </Modal>
        <Scheduler
            getRemoteEvents = { fetchRemote }
            onConfirm       = { handleConfirm }
            onDelete        = { handleDelete }

            week = {{ 
                weekDays: [0, 1, 2, 3, 4], 
                weekStartOn: 1, 
                startHour: 8, 
                endHour: 19,
                step: 60,
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
                    onlyNumbers: "Только цифры"
                },
                moreEvents: "Больше",
                noDataToDisplay: "Пусто",
                loading: "Загрузка..."
            }}

            hourFormat = { 24 }
            locale = { ru }

            fields = {[
                {
                    name: "title",
                    type: "hidden"
                },
                {
                    name: "patient",
                    type: "select",
                    options: [
                        { id: 0, text: "Попова Е. С.", value: "Попова Е. С." },
                        { id: 1, text: "Колов С. В.", value: "Колов С. В." }
                    ],
                    config: {
                        label: "Пациент",
                        required: true,
                        errMsg: "Выберите пациента"
                    }
                },
                {
                    name: "doctor",
                    type: "select",
                    options: [
                        { id: 0, text: "Терапевт", value: "Бровцева Е. В." },
                        { id: 1, text: "Дерматолог", value: "Алиева Г. В" }
                    ],
                    config: {
                        label: "Доктор",
                        required: true,
                        errMsg: "Выберите доктора"
                    }
                }
            ]}

            viewerExtraComponent=  {(fields, event) => {
                return (
                    <div>
                        <p>Запись пациента <b>{ event.patient }</b><br/>к доктору <b>{ event.doctor }</b></p>
                    </div>
                )
            }}
        />
    </>)
}

export default AdminSchedule