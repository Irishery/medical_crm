interface DTO {
    date: string
    value: number
}

export const fetchYears = async (): Promise<DTO[]> => {
    const response = await fetch(
        `http://localhost:8000/statistics/schedule/yearly`
    )

    if (!response.ok) throw new Error('Failed to fetch yearly schedule')

    return await response.json()
}
