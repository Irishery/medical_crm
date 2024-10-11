function DoctorsListElement({ doctor, speciality, name }) {
    return (
        <div className="doctor-list-element">
            <h4>{ name }</h4>
            <h4 className="element-speciality">{ speciality }</h4>
        </div>
    )
}

export default DoctorsListElement