import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import UserHeader from '../../components/UserHeader/UserHeader'
import './styles.css'

export default function Dashboard() {

    const [tasks, setTasks] = useState([])
    const user_id = localStorage.getItem('user')
    
    const loadTasks = async () => {
        const response = await api.get('/tasks?active=true', {
            headers: { user_id },
        })
    
        setTasks(response.data)
        
    }

    const markTaskAsDone = async (id) =>{
        await api.put(`/tasks/${id}`, {
            active: false
        })

        loadTasks()
    }

    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <>  
            <UserHeader user_id={user_id}/>
            <Link to="/task/new">
            <button className="btn">+ New</button>
            </Link>
            <ul onChange={console.log('teste')} className="task-list">
                {tasks.map(task => (
                    <li key={task._id}>
                    <Link to={`/task/${task._id}`} className='text-link'>
                    <h1>{task.name}</h1>
                    </Link>
                    <span>{task.description}</span>
                    <button onClick={()=>markTaskAsDone(task._id)}>Mark as Done</button>
                    </li>
                ))}
            </ul>
        </>
    )
}