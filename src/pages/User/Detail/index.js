import React, { useMemo, useState, useEffect } from 'react'
import camera from '../../../assets/camera.svg'
import api from '../../../services/api'
import './styles.css'

export default function UserDetail() {

    const user_id = localStorage.getItem('user')
    const [user, setUser] = useState({})
    const [password1, setPassword1] = useState([])
    const [password2, setPassword2] = useState([])
    const [photo, setPhoto] = useState(null)
    const [email, setEmail] = useState('')

    useEffect(() => {
        const loadUser = async () => {
            const response = await api.get(`/users/${user_id}`)

            setUser(response.data)

        }
        
        loadUser()
    }, [user_id])

    const preview = useMemo(() => {
        return photo ? URL.createObjectURL(photo) : user.photo_url
    }, [photo, user])

    console.log(user.photo_url)
    console.log(photo)

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(password1)
        console.log(password2)
    }

    return(
        <>
        <div className="user-detail">
            <label
             id="thumbnail" 
             style={{ backgroundImage: `url(${preview})` }}
             className={photo ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setPhoto(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>
            <p>{user.login}</p>
        </div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="password1">New Password *</label>
            <input
                id="password1"
                value={password1}
                onChange={event => setPassword1(event.target.value)}
            />
            <label htmlFor="password2">Confirm Password *</label>
            <input
                id="password2"
                value={password2}
                onChange={event => setPassword2(event.target.value)}
            />
            <button type="submit" className="btn">Update</button>
        </form>
        </>
    )
}