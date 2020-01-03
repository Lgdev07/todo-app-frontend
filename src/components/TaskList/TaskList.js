import React from 'react'
import { Link } from 'react-router-dom'

export default function TaskList({ task }) {
    return(
        <>
            <li key={task._id}>
            <Link to={`/task/${task._id}`} className='text-link'>
            <h1>{task.name}</h1>
            </Link>
            <span>{task.description}</span>
            <button>Mark as Done</button>
            </li>
        </>
    )
}