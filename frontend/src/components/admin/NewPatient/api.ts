export const createPatient = async (patientData: {
    full_name: string
    contact_info: string
}) => {
    const response = await fetch('http://127.0.0.1:8000/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    });

    if (!response.ok) {
        throw new Error('Failed to create patient');
    }

    return await response.json();
};