import useUser from '@/components/useUser'
import React from 'react'
import { roles } from './roles'

const Avatar = () => {
    const user = useUser()

    return (
        <div className="admin-nav-header">
            <img
                src="https://img.freepik.com/free-vector/people-design-illustration_24877-49375.jpg"
                alt="Admin Avatar"
                className="admin-avatar"
            />
            <div className="admin-info">
                <h3>{user.sub}</h3>
                <p className="admin-role">{roles[user.role]}</p>
            </div>
        </div>
    )
}

export default Avatar
