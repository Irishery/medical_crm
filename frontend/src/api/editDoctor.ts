interface Dto {
    username: string
    contact_info: string
    full_name: string
    speciality: string
}

export const editDoctor = async (id: number, dto: Partial<Dto>) => {
    const response = await fetch(`http://127.0.0.1:8000/doctors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    })

    if (!response.ok) throw new Error('Failed to edit doctor')

    return await response.json()
}
