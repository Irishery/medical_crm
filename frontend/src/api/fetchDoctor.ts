export const fetchDoctor = async (doctorId: number) => {
    const response = await fetch(`http://127.0.0.1:8000/doctors/${doctorId}`)

    if (!response.ok) throw new Error('Failed to fetch doctor')

    return await response.json()
}
