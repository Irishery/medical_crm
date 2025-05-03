import { useMemo } from 'react'

const useUser = () => {
    const token = localStorage.getItem('token')
    const decodedToken = useMemo(
        () => JSON.parse(atob(token!.split('.')[1])),
        [token]
    )

    return decodedToken
}

export default useUser
