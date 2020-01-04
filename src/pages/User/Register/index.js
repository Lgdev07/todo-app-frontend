import React, { useState, useMemo, useEffect } from 'react'
import api from '../../../services/api'
import camera from '../../../assets/camera.svg'
import defaultPhoto from '../../../assets/defaultPhoto.png'
import './styles.css'

export default function Register({ history }) {

    const [values, setValues] = useState({
      login: '',
      password1: '',
      password2: '',
      email:'',
      photo: null
    })

    const [error, setError] = useState(true)

    const handleChange = event => {
      const { name, value, files } = event.target

      setValues({
        ...values,
        [name]: value
      }) 

      if (files) {
        setValues({
          ...values,
          [name]: files[0],
        })
      }
    }

    useEffect(() => {
      if (!validateFields(values)){
        return setError(false)
      }
      return setError(true)
    }, [values])
    
    const validateFields = values =>{
      const differentPassword = values.password1 !== values.password2
      const emptyField = Object.values(values).some(value => (value === null || value === ''))

      return differentPassword || emptyField
    }

    const handleSubmit = async (event) =>{
      event.preventDefault()

      const data = new FormData()

      data.append('login', values.login)
      data.append('password', values.password1)
      data.append('email', values.email)
      data.append('photo', values.photo)

      await api.post('/users/register', data)
      
      history.push('/')
      
    }

    const preview = useMemo(() => {
        return values.photo ? URL.createObjectURL(values.photo) : defaultPhoto
    }, [values.photo])

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <label
            id="photo" 
            style={{ backgroundImage: `url(${preview})` }}
            className={values.photo ? 'has-thumbnail' : ''}
            >
            <input type="file" name="photo" onChange={handleChange}/>
            <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="name">LOGIN * </label>
            <input 
              name="login"
              className={values.password1 && !values.login ? 'length-error' : ''}
              onChange={handleChange}
            />

            
            <label htmlFor="password1">PASSWORD * </label>
            <input
              type="password"
              className={values.password2 && !values.password1 ? 'length-error' : ''}
              name="password1"
              onChange={handleChange}
            />
            <label htmlFor="password2">CONFIRM PASSWORD *</label>
            <input
              type="password"
              className={values.email && !values.password2 ? 'length-error' : ''}
              name="password2"
              onChange={handleChange}
            />
            <label htmlFor="email">EMAIL *</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
            />
            <button disabled={error} className="btn">Create</button> 
        </form>
    )
}