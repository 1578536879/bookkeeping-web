import React, { Component } from "react";
import {Input, Button} from 'antd'
import './register.css'

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            code: '',
            codeBnt: 'primary',
            codeStyle: {
                width: '55%',
                marginRight: '4%',
                marginBottom: '10px',
            }
        }
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    codeChange = (e) =>{
        this.setState({
            code: e.target.value
        })
    }

    login(){
        console.log(this.state)
    }

    render(){
        return (
            <div className="regiser">
                <Input placeholder="请输入用户名" value={this.state.email} size="middle" onChange={this.emailChange}/>
                <Input.Password placeholder="请输入密码"  value={this.state.password} className="password" size="middle" onChange={this.passwordChange}/>
                <Input placeholder="请输入验证码" value={this.state.code} style={this.state.codeStyle}/>
                <Button type={this.state.codeBnt} className="codeBnt">获取验证码</Button>
                <Button type="primary" block onClick={this.login}>登 陆</Button>
            </div>
          
        )
    }
}