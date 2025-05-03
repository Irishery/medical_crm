import React, { ReactNode, useState } from 'react'
import { Button, Modal, TextareaAutosize } from '@mui/material'
import moment from 'moment'
import MedicalCard from '../../../../src/components/MedicalCard'

type Props = {}

// {
//     "id": 61,
//     "title": "Прием: Вацлав Гертрудович Пестов",
//     "start": "2024-11-27T22:00:00.000Z",
//     "end": "2024-11-27T22:30:00.000Z",
//     "doctorId": 31,
//     "patientId": 1,
//     "patientName": "Вацлав Гертрудович Пестов",
//     "doctorName": "Ус Владимир Владимирович",
//     "adminComment": "Без комментариев"
//   }

const ScheduleInfoContent = ({
    selectedEvent,
}: {
    selectedEvent: Record<string, string> | null
}) => {
    if (!selectedEvent) return null

    return (
        <div className="h-[420px] w-3/6 overflow-scroll rounded-md bg-white px-5 py-6 shadow-md">
            <h2 className="mb-10 text-left text-lg">{selectedEvent.title}</h2>
            <div className="grid grid-flow-col auto-rows-min grid-cols-2 grid-rows-4 items-start gap-8">
                <div className="grid gap-2">
                    <label htmlFor="">ФИО специалиста</label>
                    <div>{selectedEvent.doctorName}</div>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="">Начало приема</label>
                    <div>{moment(selectedEvent.start).format('HH:mm')}</div>
                </div>

                <div className="grid gap-2">
                    <label htmlFor="">Конец приема</label>
                    <div>{moment(selectedEvent.end).format('HH:mm')}</div>
                </div>

                <div className="row-span-3 grid gap-2">
                    <label htmlFor="">Комментарий администратора</label>
                    <div className="rounded-md bg-gray-100 px-5 py-5 text-left">
                        {selectedEvent.adminComment}
                    </div>
                </div>
            </div>

            <div>
                <MedicalCard patientId={selectedEvent.patientId}></MedicalCard>
            </div>
        </div>
    )
}

export const ScheduleInfo = ({
    children,
    open,
    onClose,
    selectedEvent,
}: {
    children: ReactNode
    open: boolean
    onClose: () => void
    selectedEvent: Record<string, string> | null
}) => {
    return (
        <>
            <Modal
                onClose={onClose}
                open={open}
                className="flex items-center justify-center"
            >
                <ScheduleInfoContent selectedEvent={selectedEvent} />
            </Modal>
        </>
    )
}

export default ScheduleInfo
