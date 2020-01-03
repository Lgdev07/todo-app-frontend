import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import UserDetail from './pages/User/Detail'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/Task/Detail'
import TaskNew from './pages/Task/New'

export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/user/register" component={Register}/>
            <Route path="/user/:id" component={UserDetail}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/task/new" exact component={TaskNew}/>
            <Route path="/task/:id" exact component={TaskDetail}/>
        </Switch>
        </BrowserRouter>
    )
}