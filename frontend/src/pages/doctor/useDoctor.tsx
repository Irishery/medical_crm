import useUser from '../../../src/components/useUser'
import React, { useEffect } from 'react'

const useDoctor = () => {
    const user = useUser()

    useEffect(() => {
        fetch('localhost:8000/doctors?limit=100')
            .then((res) => res.json())
            .then((doctors) => console.log({ doctors }))
    }, [user])

    return {}
}

export default useDoctor
