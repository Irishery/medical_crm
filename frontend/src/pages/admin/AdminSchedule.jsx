import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import Modal from "react-modal";
import "./css/AdminSchedule.css"; // Custom CSS for styling improvements
import AsyncSelect from "react-select/async";

// Function to fetch data from API


const localizer = momentLocalizer(moment);

const inputStyle = {
    width: "80%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
};


const doctors = [""];
// const doctors = [
//     { label: "Doctor 1 | Therapist", value: 1 },
//     { label: "Doctor 2 | Cardiologist", value: 2 },
// ];


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
    const [editMode, setEditMode] = useState(false);
    const [editedPatientName, setEditedPatientName] = useState("");
    const [editedDoctorName, setEditedDoctorName] = useState("");
    const [editedDate, setEditedDate] = useState("");
    const [editedTime, setEditedTime] = useState("");
    const [editedAdminComment, setEditedAdminComment] = useState("");

    useEffect(() => {
        if (selectedEvent) {
            setEditedPatientName(selectedEvent.patientName);
            setEditedDoctorName(selectedEvent.doctorName);
            setEditedDate(moment(selectedEvent.start).format("YYYY-MM-DD"));
            setEditedTime(moment(selectedEvent.start).format("HH:mm"));
            setEditedAdminComment(selectedEvent.adminComment);
        }
    }, [selectedEvent]);

    useEffect(() => {
        const loadInitialEvents = async () => {
            const fetchedEvents = await fetchEventsByDoctor(selectedDoctor.value);
            setEvents(fetchedEvents);
        };
        loadInitialEvents();
    }, [selectedDoctor]);


    const fetchPatients = async (inputValue) => {
        const response = await fetch(`http://127.0.0.1:8000/patients/?skip=0&limit=10&search=${inputValue}`);
        const data = await response.json();
        return data.map((patient) => ({
            label: `${patient.full_name}`,
            value: patient.id,
        }));
    };

    const fetchDoctors = async (inputValue) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/doctors/?search=${inputValue}`);
            const data = await response.json();
            return data.map((doctor) => ({
                label: `${doctor.full_name} | ${doctor.speciality}`,
                value: doctor.id,
            }));
        } catch (error) {
            console.error("Error fetching doctors:", error);
            return [];
        }
    };

    const fetchEventsByDoctor = async (doctorId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/schedules/${doctorId}/2024-11`);
            console.log("Response Headers:", response.headers);
            console.log("Response Body (text):", await response.text()); // Inspect the raw body

            // If you confirm JSON is returned:
            const responseClone = await fetch(`http://127.0.0.1:8000/schedules/${doctorId}/2024-11`);
            const data = await responseClone.json(); // Ensure a fresh body for this call

            console.log("Parsed Data:", data);

            return data.map(schedule => ({
                id: schedule.id,
                title: `Прием: ${schedule.patient.full_name}`,
                start: new Date(schedule.date_time),
                end: new Date(new Date(schedule.date_time).getTime() + 30 * 60000),
                doctorId: schedule.doctor.id,
                patientName: schedule.patient.full_name,
                doctorName: schedule.doctor.full_name,
                adminComment: schedule.comments || "Нет комментариев",
            }));
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    };


    const handleSaveChanges = (e) => {
        if (e) e.preventDefault();  // Stop form submission
        // Update event details logic
        const updatedEvent = {
            ...selectedEvent,
            patientName: editedPatientName,
            doctorName: editedDoctorName,
            start: new Date(`${editedDate}T${editedTime}`),
            end: new Date(`${editedDate}T${editedTime}`),
            adminComment: editedAdminComment,
        };

        setEvents((prevEvents) =>
            prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
        setEditMode(false);  // Turn off edit mode after saving
    };


    const filteredEvents = events
        .filter(event => event.doctorId === selectedDoctor.value)

    const handleSelectDoctor = async (selectedOption) => {
        // Ensure selectedOption is valid
        if (!selectedOption) {
            console.error("No doctor selected.");
            return;
        }

        try {
            setSelectedDoctor(selectedOption);

            // Optional: Fetch events or perform actions related to the selected doctor
            const fetchedEvents = await fetchEventsByDoctor(selectedOption.value);
            setEvents(fetchedEvents);
        } catch (error) {
            console.error("Error handling doctor selection:", error);
        }
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
                <AsyncSelect
                    cacheOptions
                    loadOptions={fetchDoctors}
                    defaultOptions // Load initial options without typing
                    onChange={handleSelectDoctor}
                    value={selectedDoctor}
                    placeholder="Начните вводить имя врача"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            borderRadius: "6px",
                            padding: "5px",
                            fontSize: "16px",
                        }),
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                        }),
                    }}
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
                onRequestClose={() => {
                    setModalIsOpen(false);
                    setEditMode(false); // Reset edit mode when closing
                }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                    content: {
                        maxWidth: "700px",
                        height: "fit-content",
                        margin: "auto",
                        borderRadius: "12px",
                        padding: "20px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                {selectedEvent && (
                    <form onSubmit={(e) => handleSaveChanges(e)}>
                        <h3 style={{ textAlign: "center", fontSize: "22px", fontWeight: "600" }}>
                            {editMode ? "Редактировать Прием" : selectedEvent.title}
                        </h3>

                        {/* Two-column Layout */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                            {/* ФИО Пациента */}
                            <div>
                                <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                                    ФИО пациента:
                                </label>
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={fetchPatients}
                                    defaultOptions={[]}
                                    value={{ label: editedPatientName, value: selectedEvent?.patientId }}
                                    onChange={(selected) => setEditedPatientName(selected.label)}
                                    isDisabled={!editMode}
                                />
                            </div>

                            {/* ФИО Специалиста */}
                            <div>
                                <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                                    ФИО специалиста:
                                </label>
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={fetchDoctors}
                                    defaultOptions={[]}
                                    value={{ label: editedDoctorName, value: selectedEvent?.doctorId }}
                                    onChange={(selected) => setEditedDoctorName(selected.label)}
                                    isDisabled={!editMode}
                                />
                            </div>


                            {/* Date & Time */}
                            <div>
                                <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>Дата:</label>
                                <input
                                    type="date"
                                    value={editedDate}
                                    onChange={(e) => setEditedDate(e.target.value)}
                                    disabled={!editMode}
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>Время:</label>
                                <input
                                    type="time"
                                    value={editedTime}
                                    onChange={(e) => setEditedTime(e.target.value)}
                                    disabled={!editMode}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Admin Comment Section */}
                        <div style={{ marginTop: "20px" }}>
                            <label style={{ fontWeight: "600", marginBottom: "5px", display: "block" }}>
                                Комментарий администратора:
                            </label>
                            <textarea
                                value={editedAdminComment}
                                onChange={(e) => setEditedAdminComment(e.target.value)}
                                rows="3"
                                disabled={!editMode}
                                style={{
                                    ...inputStyle,
                                    resize: "none",
                                    height: "80px",
                                }}
                            />
                        </div>

                        {/* Buttons Section */}
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <button
                                type="button"
                                style={{ color: "#007BFF", background: "none", border: "none", fontSize: "16px", cursor: "pointer" }}
                                onClick={() => alert("Показать медкарту")}
                            >
                                Медкарта
                            </button>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button className="btn-delete" type="button" onClick={handleDeleteEvent}>
                                    Удалить
                                </button>
                                <button
                                    className="btn-edit"
                                    type="button"  // Prevent it from acting like a submit button
                                    onClick={() => {
                                        if (editMode) {
                                            handleSaveChanges(); // Save and exit edit mode
                                        } else {
                                            setEditMode(true); // Enable edit mode
                                        }
                                    }}
                                >
                                    {editMode ? "Сохранить" : "Редактировать"}
                                </button>

                            </div>
                        </div>
                    </form>
                )}
            </Modal>



        </div>
    );
}

export default AdminSchedule;
