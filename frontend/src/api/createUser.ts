interface Dto {
    username: string
    role: string
    password: string
}

export const createUser = async (dto: Dto) => {
    const response = await fetch(`http://127.0.0.1:8000/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    })

    if (!response.ok) {
        const res = await response.json()
        throw new Error(res.detail)
    }

    return await response.json()
}
