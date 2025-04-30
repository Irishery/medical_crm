const useUser = () => {
    const token = localStorage.getItem('token')
    const decodedToken = JSON.parse(atob(token.split('.')[1]))

    return decodedToken
}

export default useUser
