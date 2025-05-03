import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AsyncSelect from 'react-select/async'
import useUser from '../../../components/useUser'
import useDoctor from '../useDoctor'
import ScheduleInfo from './ScheduleInfo'

const localizer = momentLocalizer(moment)

function DoctorSchedule() {
    const [events, setEvents] = useState([])
    const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM')) // New state for current month
    const [selectedEvent, setSelectedEvent] = useState(null)
    const user = useUser()
    const doctor = useDoctor(user.user_id)

    console.log(doctor)

    useEffect(() => {
        const loadInitialEvents = async () => {
            const fetchedEvents = await fetchEventsByDoctor(doctor.id)
            setEvents(fetchedEvents)
        }
        if (doctor) loadInitialEvents()
    }, [doctor, currentMonth])

    const fetchEventsByDoctor = async (doctorId) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/schedules/${doctorId}/${currentMonth}`
            )
            console.log('Response Headers:', response.headers)
            console.log('Response Body (text):', await response.text()) // Inspect the raw body

            // If you confirm JSON is returned:
            const responseClone = await fetch(
                `http://127.0.0.1:8000/schedules/${doctorId}/${currentMonth}`
            )
            const data = await responseClone.json() // Ensure a fresh body for this call

            console.log('Parsed Data:', data)

            return data.map((schedule) => ({
                id: schedule.id,
                title: `Прием: ${schedule.patient.full_name}`,
                start: new Date(schedule.date_time),
                end: new Date(
                    new Date(schedule.date_time).getTime() + 30 * 60000
                ),
                doctorId: schedule.doctor.id,
                patientId: schedule.patient.id,
                patientName: schedule.patient.full_name,
                doctorName: schedule.doctor.full_name,
                adminComment: schedule.comments || 'Нет комментариев',
            }))
        } catch (error) {
            console.error('Error fetching events:', error)
            return []
        }
    }

    const filteredEvents = events.filter(
        (event) => event.doctorId === doctor.id
    )

    const handleMonthChange = (date) => {
        setCurrentMonth(moment(date).format('YYYY-MM'))
    }

    const handleSelectEvent = (event) => {
        setSelectedEvent(event)
    }

    const handleModalClose = () => {
        setSelectedEvent(null)
    }

    return (
        <div className="admin-schedule-container">
            <h2 className="schedule-title">Расписание</h2>

            <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, marginTop: '20px' }}
                eventPropGetter={() => ({
                    style: {
                        backgroundColor: '#d3e3fd',
                        borderRadius: '5px',
                        border: 'none',
                        padding: '5px',
                        color: '#000',
                    },
                })}
                onSelectEvent={handleSelectEvent}
                onNavigate={handleMonthChange} // Capture month changes
            />

            <ScheduleInfo
                open={Boolean(selectedEvent)}
                selectedEvent={selectedEvent}
                onClose={handleModalClose}
            ></ScheduleInfo>
        </div>
    )
}

export default DoctorSchedule
