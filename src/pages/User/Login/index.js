import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'
import './styles.css'

export default function Login({ history }){

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [wrongLogin, setWrongLogin] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setWrongLogin(false)

        const response = await api.post('/users/login', {login, password})
        
        if (!response.data) {
            setWrongLogin(true)
            return
        }

        const { _id } = response.data

        localStorage.setItem('user', _id)

        history.push('/dashboard')
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="login">Login *</label>
            <input
                id="login"
                placeholder="Type your Login"
                value={login}
                onChange={event => setLogin(event.target.value)}
            />
            <label htmlFor="password">Password *</label>
            <input
                id="password"
                placeholder="Type your Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <span id={wrongLogin ? 'login-true' : 'login-false'}>Wrong Login or Password</span>
            <button type="submit" className="btn">Login</button>
        </form>

        <span>Don't have an account?</span>
        <Link to="/user/register">
            <button className="btn">Register</button>
        </Link>
        </>
    )
}