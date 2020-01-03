import React, { useState, useEffect } from 'react'
import api from '../../../services/api'
import './styles.css'

export default function TaskDetail({ match }){

    const [task, setTask] = useState({})

    useEffect(() => {
        const loadTask = async () => {
            const { id } = match.params
            const response = await api.get(`/tasks/${id}`)

            setTask(response.data)
            
        }

        loadTask()
        
    }, [match])

    return (
        <div className="task-description">
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            <button className="mark-done">Mark as Done</button>
            <button className="mark-delete">Delete</button>
        </div>
    )
}