import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode' // Import jwt-decode library
import './css/Login.css'
import { Input, Button } from '@mui/material'

function Login() {
    const [username, setUsername] = useState('') // Changed from email to username
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:8000/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: username, // Changed key to username
                    password: password,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                const token = data.access_token

                // Store the token in localStorage
                localStorage.setItem('token', token)

                // Decode the token to extract the role
                const decodedToken = jwtDecode(token)
                const userRole = decodedToken.role
                const userID = decodedToken.id
                console.log(userID)
                console.log(decodedToken)

                // Redirect based on the role
                if (userRole === 'admin') {
                    navigate('/admin/schedule')
                } else if (userRole === 'doctor') {
                    navigate('/doctor')
                } else if (userRole === 'head_doctor') {
                    navigate('/head_doctor')
                } else {
                    console.log(decodedToken)
                    console.log(userRole)
                    console.log('Unknown role:', userRole)
                    setError('Unknown role. Please contact support.')
                }
            } else {
                setError('Invalid username or password')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <div
            className="flex h-dvh items-center justify-center"
            id="login-container "
        >
            <div>
                <form className="grid gap-2" onSubmit={handleSubmit}>
                    <Input
                        type="text" // Changed from email to text
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <Button variant="contained" type="submit" value="Login">
                        Войти
                    </Button>
                </form>
                {error && (
                    <p className="mt-2" style={{ color: 'red' }}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login
