import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DoctorMedicalCard() {
    const { id } = useParams();
    const [medicalCard, setMedicalCard] = useState(null);

    useEffect(() => {
        const fetchMedicalCard = async () => {
            const response = await fetch(`http://127.0.0.1:8000/patients/${id}/medical-card`);
            const data = await response.json();
            setMedicalCard(data);
        };
        fetchMedicalCard();
    }, [id]);

    if (!medicalCard) return <div>Загрузка...</div>;

    return (
        <div>
            <h2>Медицинская карта: {medicalCard.patient_name}</h2>
            <p><strong>Диагнозы:</strong> {medicalCard.diagnoses}</p>
            <p><strong>Назначения:</strong> {medicalCard.treatments}</p>
        </div>
    );
}

export default DoctorMedicalCard;
