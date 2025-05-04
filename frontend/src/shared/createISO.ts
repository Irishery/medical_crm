const createISO = (date: string, time: string) => {
    const [day, month, year] = date.split('.').map(Number)
    const [hours, minutes] = time.split(':').map(Number)
    const dateTime = new Date(
        Date.UTC(year, month - 1, day, hours, minutes, 0, 0)
    )
    const isoString = dateTime.toISOString()

    return isoString
}
