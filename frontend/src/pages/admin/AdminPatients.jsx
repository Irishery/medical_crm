import "./css/AdminPatients.css"


function AdminPatients() {
    const patients = [
        {doctor: "Бровцева Е. В.", speciality: "Терапевт", name: "Попова Е. С."},
        {doctor: "Алиева Г. В", speciality: "Дерматолог", name: "Колов С. В."},
    ]

    return (<>
        <h1 className="page-title">База пациентов</h1>
        <input type="text" id="search-patient" placeholder="🔍︎ Искать по ФИО / контактам"/>
        <div id="patients-list">
            <div id="patients-legend" className="patient-list-element">
                <h4>Доктор</h4>
                <h4>Специальность</h4>
                <h4>ФИО</h4>
            </div>
            {
                patients.map(patient =>
                    (
                        <div className="patient-list-element">
                            <h4>{ patient.doctor }</h4>
                            <h4 className="element-speciality">{ patient.speciality }</h4>
                            <h4>{ patient.name }</h4>
                        </div>
                    )
                )
            }
        </div>
    </>)
}

export default AdminPatients