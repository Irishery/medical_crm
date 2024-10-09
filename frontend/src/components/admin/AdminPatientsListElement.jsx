function PatientsListElement({ doctor, speciality, name }) {
    return (
        <div className="patient-list-element">
            <h4>{ doctor }</h4>
            <h4 className="element-speciality">{ speciality }</h4>
            <h4>{ name }</h4>
        </div>
    )
}

export default PatientsListElement