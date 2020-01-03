import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import TaskList from '../../components/TaskList/TaskList'
import UserHeader from '../../components/UserHeader/UserHeader'
import './styles.css'

export default function Dashboard() {

    const [tasks, setTasks] = useState([])
    const user_id = localStorage.getItem('user')

    useEffect(() => {
        const loadTasks = async () => {
            const response = await api.get('/tasks?active=false', {
                headers: {
                    user_id: user_id
                },
            })
            setTasks(response.data)
        }
        loadTasks()
    }, [user_id])

    return (
        <>  
            <UserHeader user_id={user_id}/>
            <Link to="/task/new">
            <button className="btn">+ New</button>
            </Link>
            <ul className="task-list">
                {tasks.map(task => (
                    <TaskList key={task._id} task={task} />
                ))}
            </ul>
        </>
    )
}