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
    const [isEditingMedicalCard, setIsEditingMedicalCard] = useState(false);
    const [editedAdminComment, setEditedAdminComment] = useState("");
    const [medicalCardModalIsOpen, setMedicalCardModalIsOpen] = useState(false);
    const [medicalCardData, setMedicalCardData] = useState(null);


    useEffect(() => {
        if (selectedEvent) {
            setEditedPatientName({
                label: selectedEvent.patientName,
                value: selectedEvent.patientId, // Ensure patientId is set here
            });
            setEditedDoctorName({
                label: selectedEvent.doctorName,
                value: selectedEvent.doctorId, // Ensure doctorId is set here
            });
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
                patientId: schedule.patient.id,
                patientName: schedule.patient.full_name,
                doctorName: schedule.doctor.full_name,
                adminComment: schedule.comments || "Нет комментариев",
            }));
        } catch (error) {
            console.error("Error fetching events:", error);
            return [];
        }
    };


    const handleSaveChanges = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); // Prevent form submission if triggered via form
        }
        try {
            const updatedSchedule = {
                patient_id: editedPatientName?.value, // Use value (id) of the selected patient
                doctor_id: editedDoctorName?.value,  // Use value (id) of the selected doctor
                date_time: `${editedDate}T${editedTime}`, // Combine date and time
                comments: editedAdminComment,
            };

            const response = await fetch(`http://127.0.0.1:8000/schedules/${selectedEvent.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedSchedule),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to update schedule: ${errorText}`);
                throw new Error("Failed to update schedule");
            }

            const result = await response.json();
            console.log("Schedule updated successfully:", result);
            // Update events state
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === result.id
                        ? {
                            ...event,
                            title: `Прием: ${result.patient_name}`,
                            patientName: result.patient_name,
                            doctorName: result.doctor_name,
                            start: new Date(result.date_time),
                            end: new Date(new Date(result.date_time).getTime() + 30 * 60000),
                            adminComment: result.comments,
                        }
                        : event
                )
            );

            setModalIsOpen(false);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating schedule:", error);
            alert("Ошибка при обновлении расписания.");
        }
    };

    const handleSaveMedicalCard = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/patients/${selectedEvent.patientId}/medical-card`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(medicalCardData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to update medical card: ${errorText}`);
                throw new Error("Failed to update medical card");
            }

            const result = await response.json();
            console.log("Medical card updated successfully:", result);

            // Refresh the medical card data
            await fetchMedicalCardData(selectedEvent.patientId);
            setIsEditingMedicalCard(false);
        } catch (error) {
            console.error("Error updating medical card:", error);
            alert("Ошибка при обновлении медицинской карты.");
        }
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
            setEvents(fetchedEvents); urban3purban3purban3p
        } catch (error) {
            console.error("Error handling doctor selection:", error);
        }
    };

    const openMedicalCardModal = async () => {
        if (selectedEvent?.patientId) {
            await fetchMedicalCardData(selectedEvent.patientId);
            setMedicalCardModalIsOpen(true);
        } else {
            alert("No patient ID available.");
        }
    };

    const closeMedicalCardModal = () => {
        setMedicalCardModalIsOpen(false);
        setMedicalCardData(null);
    };

    // Function to fetch medical card data
    const fetchMedicalCardData = async (patientId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/patients/${patientId}/medical-card`);
            if (!response.ok) throw new Error("Failed to fetch medical card data");

            const data = await response.json();

            // Set medical card data
            setMedicalCardData(data);

            // Log the full name only after the data has been set
            console.log("Medical Card Data:", data);

            // Make sure the medicalCardData is populated before trying to access it
            if (data && data.full_name) {
                console.log("Full Name:", data.full_name);
            } else {
                console.error("Full Name is missing in the fetched data.");
            }
        } catch (error) {
            console.error("Error fetching medical card data:", error);
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
                                    defaultOptions
                                    value={editedPatientName} // Set the full object {label, value}
                                    onChange={(selected) => setEditedPatientName(selected)} // Store the full object
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
                                    defaultOptions
                                    value={editedDoctorName} // Set the full object {label, value}
                                    onChange={(selected) => setEditedDoctorName(selected)} // Store the full object
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
                                onClick={openMedicalCardModal}
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
            {/* Medical Card Modal */}
            <Modal
                isOpen={medicalCardModalIsOpen}
                onRequestClose={closeMedicalCardModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1001,
                    },
                    content: {
                        maxWidth: "800px",
                        margin: "auto",
                        borderRadius: "12px",
                        padding: "20px",
                    },
                }}
            >
                <h2 className="modal-title">Медкарта</h2>
                {medicalCardData ? (
                    <div>
                        {/* Patient Information */}
                        <p>ФИО пациента: {isEditingMedicalCard ?
                            <input type="text" value={medicalCardData.full_name} onChange={(e) => setMedicalCardData(prev => ({ ...prev, full_name: e.target.value }))} className="modal-input" /> :
                            medicalCardData.full_name}</p>
                        <p>Пол: {isEditingMedicalCard ?
                            <input type="text" value={medicalCardData.gender} onChange={(e) => setMedicalCardData(prev => ({ ...prev, gender: e.target.value }))} className="modal-input" /> :
                            medicalCardData.gender}</p>
                        <p>Серия и номер полиса ОМС: {isEditingMedicalCard ?
                            <input type="text" value={medicalCardData.oms_number} onChange={(e) => setMedicalCardData(prev => ({ ...prev, oms_number: e.target.value }))} className="modal-input" /> :
                            medicalCardData.insurance_series_number}</p>
                        <p>Код льготы: {isEditingMedicalCard ?
                            <input type="text" value={medicalCardData.benefit_code} onChange={(e) => setMedicalCardData(prev => ({ ...prev, benefit_code: e.target.value }))} className="modal-input" /> :
                            medicalCardData.benefit_code}</p>

                        {/* List of Diagnoses */}
                        <h3>Список заболеваний</h3>
                        {/* {isEditingMedicalCard ?
                            <textarea value={medicalCardData.diseases} onChange={(e) => setMedicalCardData(prev => ({ ...prev, diseases: e.target.value }))} className="modal-textarea"></textarea> :
                            <p>{medicalCardData.diseases}</p>} */}

                        {/* Medical History Table */}
                        {/* <h3>История приемов</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Диагноз</th>
                                    <th>ФИО врача</th>
                                    <th>Дата</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicalCardData.history.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.diagnosis}</td>
                                        <td>{entry.doctor_name}</td>
                                        <td>{entry.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}

                        {/* Buttons */}
                        <button onClick={() => setIsEditingMedicalCard(!isEditingMedicalCard)} className="btn-edit-medical">
                            {isEditingMedicalCard ? "Отменить редактирование" : "Редактировать"}
                        </button>
                        {isEditingMedicalCard && (
                            <button onClick={handleSaveMedicalCard} className="btn-save-medical">Сохранить</button>
                        )}
                    </div>
                ) : (
                    <p>Загрузка...</p>
                )}
                <button
                    type="button"
                    onClick={closeMedicalCardModal}
                    className="btn-close-modal"
                >
                    Закрыть
                </button>
            </Modal>



        </div>
    );
}

export default AdminSchedule;
