import React, { useState, useEffect } from 'react'
import api from '../../../services/api'
import './styles.css'

export default function TaskDetail({ match, history }){

    const [task, setTask] = useState({})
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const { id } = match.params

    const handleDone = async () =>{
        await api.put(`/tasks/${id}`, {
            active: false
        })

        history.push('/dashboard')
    }

    const handleUpdate = async () =>{
        await api.put(`/tasks/${id}`, {
            name: name || task.name,
            description: description || task.description,
        })

        history.push('/dashboard')
    }

    const handleDelete = async () =>{
        await api.delete(`/tasks/${id}`)

        history.push('/dashboard')
    }

    useEffect(() => {
        const loadTask = async () => {
            const response = await api.get(`/tasks/${id}`)

            setTask(response.data)
            
        }

        loadTask()
        
    }, [id])

    return (
        <div className="task-description">
            <input 
                onChange={event => setName(event.target.value)} 
                defaultValue={task.name}
                className="input-name"
            />
            <textarea 
                onChange={event => setDescription(event.target.value)} 
                defaultValue={task.description}
                className="input-description"
            />
            <button onClick={handleDone} className="mark-done">Mark as Done</button>
            <button onClick={handleUpdate} className="mark-update">Update</button>
            <button onClick={handleDelete} className="mark-delete">Delete</button>
        </div>
    )
}