import React, { ComponentProps } from 'react'
import { Button } from '@mui/material'


const Logout = (props: ComponentProps<typeof Button>) => {
    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <Button variant='contained' className='!bg-red-700' {...props} onClick={handleLogout}>Выйти</Button>
    )
}

export default Logout