import "./css/AdminDoctors.css"


function AdminDoctors() {
    const doctors = [
        {speciality: "Терапевт", name: "Бровцева Е. В."},
        {speciality: "Дерматолог", name: "Алиева Г. В"},
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
                    (
                        <div className="doctor-list-element">
                            <h4>{ doctor.name }</h4>
                            <h4 className="element-speciality">{ doctor.speciality }</h4>
                        </div>
                    )
                )
            }
        </div>
    </>)
}

export default AdminDoctors