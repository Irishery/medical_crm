import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import Modal from "react-modal";
import "./css/AdminSchedule.css"; // Custom CSS for styling improvements

const localizer = momentLocalizer(moment);

const doctors = [
    { value: "1", label: "Доктор Иванов" },
    { value: "2", label: "Доктор Петров" },
];

const initialEvents = [
    {
        id: 1,
        title: "Прием у терапевта",
        start: new Date(2024, 9, 9, 12, 0),
        end: new Date(2024, 9, 9, 12, 30),
        doctorId: "1",
        patientName: "Петр Петрович Петров",
        doctorName: "Иван Иванович Иванов",
        adminComment: "Поставьте ему клизму",
    },
];

function AdminSchedule() {
    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
    const [events, setEvents] = useState(initialEvents);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = events
        .filter(event => event.doctorId === selectedDoctor.value)
        .filter(event =>
            event.patientName.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleSelectDoctor = (selectedOption) => {
        setSelectedDoctor(selectedOption);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalIsOpen(true);
    };

    const handleDeleteEvent = () => {
        setEvents(events.filter(event => event.id !== selectedEvent.id));
        setModalIsOpen(false);
    };

    return (
        <div className="admin-schedule-container">
            <h2 className="schedule-title">Расписание</h2>

            <div className="controls">
                <Select
                    options={doctors}
                    value={selectedDoctor}
                    onChange={handleSelectDoctor}
                    placeholder="Выберите врача"
                    className="doctor-select"
                />
                <input
                    type="text"
                    placeholder="Сортировка по ФИО/специальности"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, marginTop: "20px" }}
                eventPropGetter={() => ({
                    style: {
                        backgroundColor: "#d3e3fd",
                        borderRadius: "5px",
                        border: "none",
                        padding: "5px",
                        color: "#000",
                    },
                })}
                onSelectEvent={handleEventClick}
            />

<Modal
    isOpen={modalIsOpen}
    onRequestClose={() => setModalIsOpen(false)}
    style={{
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },
        content: {
            maxWidth: "700px", // Reduce width slightly
            height: "fit-content", // Automatically adjust based on content
            margin: "auto",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
    }}
>
    {selectedEvent && (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h3 style={{ textAlign: "center", fontSize: "22px", fontWeight: "600" }}>
                {selectedEvent.title}
            </h3>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                <div className="modal-names" style={{ flex: 1 }}>
                    <p><strong>ФИО пациента:</strong></p>
                    <p style={{ fontSize: "16px" }}>{selectedEvent.patientName}</p>

                    <p><strong>ФИО специалиста:</strong></p>
                    <p style={{ fontSize: "16px" }}>{selectedEvent.doctorName}</p>
                </div>

                <div className="modal-times" style={{ flex: 1 }}>
                    <p><strong>Начало приема:</strong> {moment(selectedEvent.start).format("HH:mm")}</p>
                    <p><strong>Конец приема:</strong> {moment(selectedEvent.end).format("HH:mm")}</p>

                    <p><strong>Комментарий администратора:</strong></p>
                    <textarea
                        value={selectedEvent.adminComment}
                        readOnly
                        style={{
                            width: "100%",
                            height: "60px", // Limit height for compactness
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #e0e0e0",
                            borderRadius: "6px",
                            backgroundColor: "#f8f9fa",
                            boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.05)",
                            resize: "none",
                        }}
                    />
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <button
                    className="btn-medical"
                    style={{ color: "#007BFF", border: "none", background: "none" }}
                    onClick={() => alert("Показать медкарту")}
                >
                    Медкарта
                </button>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn-delete" onClick={handleDeleteEvent}>
                        Удалить
                    </button>
                    <button className="btn-edit" onClick={() => alert("Функция изменения")}>
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    )}
</Modal>




        </div>
    );
}

export default AdminSchedule;
