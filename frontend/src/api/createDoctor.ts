interface Dto {
    username: string
    speciality: string
    contact_info: string
    full_name: string
}

export const createDoctor = async (dto: Dto) => {
    const response = await fetch(`http://127.0.0.1:8000/doctors/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    })

    if (!response.ok) throw new Error('Failed to create doctor')

    return await response.json()
}
