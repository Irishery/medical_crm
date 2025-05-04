interface Dto {
    date_time: string
    comments: string
    doctor_id: number
    patient_id: number
}

export const createSchedule = async (dto: Dto) => {
    const response = await fetch(`http://127.0.0.1:8000/schedules/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    })

    if (!response.ok) throw new Error('Failed to create schedule')

    return await response.json()
}
