import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';
import home from './pages/home/home'
import setUp from './pages/setUp/setUp'
import app from './pages/App/App'
import forgetPassword from './pages/forgetPassword/forgetPassword'

const router = () =>(
    // eslint-disable-next-line no-unused-expressions
    <HashRouter>
        <Switch>
            <Route exact path='/home' component={home}></Route>
            <Route exact path='/' component={app}></Route> 
            <Route exact path='/set-up' component={setUp}></Route>
            <Route exact path='/forget-password' component={forgetPassword}></Route>
        </Switch>
    </HashRouter>
)

export default router