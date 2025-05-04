export const fetchAdmin = async (id: number) => {
    const response = await fetch(`http://127.0.0.1:8000/admin/${id}`)

    if (!response.ok) throw new Error('Failed to fetch doctor')

    return await response.json()
}
