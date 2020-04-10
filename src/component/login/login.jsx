import React, { Component } from "react";
import {Input, Button} from 'antd'
import './login.css'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.emailChange = this.emailChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
        this.login = this.login.bind(this)
    }

    emailChange = (e) =>{
        this.setState({
            email: e.target.value
        })
    }

    passwordChange = (e) =>{
        this.setState({
            password: e.target.value
        })
    }

    login(){
        console.log(this.props)
        this.props.history.push({
            pathname: '/home',
            query: {
                data: '123124'
            }
        })
    }

    render(){
        return (
            <div className="login">
                <Input placeholder="请输入邮箱" value={this.state.email} size="middle" onChange={this.emailChange}/>
                <Input.Password placeholder="请输入密码"  value={this.state.password} className="password" size="middle" onChange={this.passwordChange}/>
                <Button type="primary" block onClick={this.login}>登 陆</Button>
            </div>
          
        )
    }
}