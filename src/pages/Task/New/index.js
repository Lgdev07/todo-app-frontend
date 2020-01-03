import React, { useState } from 'react'
import api from '../../../services/api'
import './styles.css'

export default function TaskNew({ history }){

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const user_id = localStorage.getItem('user')

    const handleSumbmit = async (event) => {
        event.preventDefault()
        await api.post('/tasks', { 
            name,
            description
         }, {
             headers: { user_id }
         })

         history.push('/dashboard')
    }

    return (
        <form onSubmit={handleSumbmit}>
            <label htmlFor="name">NAME</label>
            
            <input 
              id="name"
              placeholder="Name of your task"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <label htmlFor="description">DESCRIPTION</label>
            <textarea 
              id="description"
              placeholder="Detail of your task"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
            <button className="btn">Create</button>
        </form>
    )
   
}