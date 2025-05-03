import useUser from '../../../src/components/useUser'
import React, { useEffect, useState } from 'react'

const useDoctor = () => {
    const [doctor, setDoctor] = useState<Record<string, string> | null>(null)
    const user = useUser()

    useEffect(() => {
        if (user)
            fetch(`http://127.0.0.1:8000/doctors/${user.sub}/`)
                .then((res) => res.json())
                .then((doctor) => setDoctor(doctor))
    }, [user])

    return doctor
}

export default useDoctor
