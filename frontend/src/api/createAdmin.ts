interface Dto {
    username: string
    contact_info: string
    full_name: string
}

export const createAdmin = async (dto: Dto) => {
    const response = await fetch(`http://127.0.0.1:8000/admin/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    })

    if (!response.ok) throw new Error('Failed to create admin')

    return await response.json()
}
