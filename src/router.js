import React from 'react'
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';
import home from './pages/home/home'
import setUp from './pages/setUp/setUp'
import app from './pages/App/App'
import forgetPassword from './pages/forgetPassword/forgetPassword'
import inviteUser from './pages/inviteUser/inviteUser'

const router = () =>(
    // eslint-disable-next-line no-unused-expressions
    <BrowserRouter>
        <Switch>
            <Route exact path='/home' component={home}></Route>
            <Route exact path='/' component={app}></Route> 
            <Route exact path='/set-up' component={setUp}></Route>
            <Route exact path='/forget-password' component={forgetPassword}></Route>
            <Route exact path='/invite/*' component={inviteUser}></Route>
        </Switch>
    </BrowserRouter>
)

export default router