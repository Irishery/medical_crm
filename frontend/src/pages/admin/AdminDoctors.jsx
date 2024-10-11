import DoctorsListElement from "../../components/admin/AdminDoctorsListElement"
import "./AdminDoctors.css"

function AdminDoctors() {
    const doctors = [
        {speciality: "Терапевт", name: "Попова Е. С."},
        {speciality: "Дерматолог", name: "Колов С. В."},
    ]

    return (<>
        <h1 className="page-title">База докторов</h1>
        <input type="text" id="search-doctor" placeholder="🔍︎ Искать по ФИО / контактам / специализации"/>
        <div id="doctors-list">
            <div id="doctors-legend" className="doctor-list-element">
                <h4>ФИО</h4>
                <h4>Специальность</h4>
            </div>
            {
                doctors.map(doctor =>
                    <DoctorsListElement { ...doctor }/>
                )
            }
        </div>
    </>)
}

export default AdminDoctors