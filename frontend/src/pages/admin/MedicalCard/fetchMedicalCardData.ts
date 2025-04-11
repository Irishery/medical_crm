export const fetchMedicalCardData = async (patientId: string) => {
    const response = await fetch(
        `http://127.0.0.1:8000/patients/${patientId}/medical-card`
    )

    if (!response.ok)
        throw new Error('Failed to fetch medical card data')


    return await response.json()
}