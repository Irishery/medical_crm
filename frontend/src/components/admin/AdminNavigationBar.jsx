import { useState } from "react"
import Modal from "react-modal";

import "./css/AdminNavigationBar.css"
import NewPatientForm from "./NewPatientForm";


function AdminNavigationBar() {
    Modal.setAppElement("#root")

    const [isNewPatient,     setPatientModal]     = useState(false)
    const [isNewAppointment, setAppointmentModal] = useState(false)
    const pathname = location.pathname

    return (<>
        <div id="admin-navigation-bar">
            <a href="/profile"  className={ pathname == "/profile"?  "active" : "" }>Профиль</a>
            <a href="/schedule" className={ pathname == "/schedule"? "active" : "" }>Расписание</a>
            <a href="/patients" className={ pathname == "/patients"? "active" : "" }>Пациенты</a>
            <a href="/doctors"  className={ pathname == "/doctors"?  "active" : "" }>Доктора</a>
        </div>
        <div id="admin-navigation-bar-actions">
            <button id="new-patient" onClick={ () => setPatientModal(true) }>Новый пациент</button>
            <button id="new-appointment" onClick={ () => setAppointmentModal(true) }>Новый приём</button>
            <a href="/logout" id="logout">→ Выход</a>
        </div>
        <Modal
            isOpen         = { isNewPatient }
            onRequestClose = { () => setPatientModal(false) }
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
              contentLabel = "Новый пациент"
        >
            <NewPatientForm/>
        </Modal>
        <Modal
            isOpen         = { isNewAppointment }
            onRequestClose = { () => setAppointmentModal(false) }
            style          = {{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)"
                }
              }}
              contentLabel = "Новый приём"
        >
            <h1>Приём</h1>
        </Modal>
    </>)
}

export default AdminNavigationBar