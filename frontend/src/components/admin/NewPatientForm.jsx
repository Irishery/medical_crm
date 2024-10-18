import "./css/NewPatientForm.css"


function NewPatientForm() {
    return (
        <div id="new-patient-form">
            <h2>Новый пациент</h2>
            <form method="POST" action="/patients">
                <label htmlFor="new-patient-name-input">ФИО</label>
                <input id="new-patient-name-input"></input>
                <label htmlFor="new-patient-phone-input">Номер телефона</label>
                <input id="new-patient-phone-input" type="phone"></input>
                <button id="submit-new-patient" type="submit">Добавить</button>
            </form>
        </div>
    )
}

export default NewPatientForm