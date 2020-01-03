import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

export default function UserHeader({ user_id }){

    const [user, setUser] = useState({})

    useEffect(() => {
        const loadUser = async () => {
            const response = await api.get(`/users/${user_id}`)

            setUser(response.data)
        }
        loadUser()

    }, [user_id])

    return(
        <div className="user-header">
        <img src={user.photo_url} alt="User"/>
        <Link to={`/user/${user_id}`} className='text-link'>
        <p>{user.login}</p>
        </Link>
        </div>
    )
}