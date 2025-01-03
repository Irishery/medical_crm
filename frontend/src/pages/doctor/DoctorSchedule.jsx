import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function DoctorSchedule() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await fetch("http://127.0.0.1:8000/schedules");
            const data = await response.json();
            const mappedEvents = data.map((event) => ({
                id: event.id,
                title: event.patient_name,
                start: new Date(event.start_time),
                end: new Date(event.end_time),
            }));
            setEvents(mappedEvents);
        };
        fetchSchedule();
    }, []);

    return (
        <div>
            <h2>Моё расписание</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default DoctorSchedule;
