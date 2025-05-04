interface Dto {
    date_time: string
    diagnosis: string
    patient_review: string
    treatment: string
    doctor_notes: string
}

export const createConsultation = async (dto: Dto) => {
    const response = await fetch(`http://127.0.0.1:8000/consultations/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    })

    if (!response.ok) throw new Error('Failed to create consultation')

    return await response.json()
}
