import React, { Component } from "react";
import {Input, Button, Form} from 'antd'
import {LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import './register.css'

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            code: '',
            username: '',
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

    register(){
        console.log(this.state)
    }

    render(){
        return (
            <Form className='register' style={{margin: 'auto'}} onClick={this.register} >
                <Form.Item name='email' rules={[{
                    required: true,
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '邮箱格式错误'
                }]} style={{marginBottom: '10px'}}>
                    <Input prefix={<MailOutlined />} placeholder='请输入邮箱' value={this.state.email}></Input>
                </Form.Item>
                <Form.Item style={{marginBottom: '10px'}}>
                    <Input prefix={<UserOutlined />}  type="password" placeholder="请输入用户名" value={this.state.username} />
                </Form.Item>
                <Form.Item name="password" style={{marginBottom: '10px'}}>
                    <Input.Password prefix={<LockOutlined/>}  type="password" placeholder="请输入密码" value={this.state.password} />
                </Form.Item>

                <Form.Item style={{marginBottom: '10px'}}>
                    <Input value={this.state.code} placeholder='验证码' style={{width: '53%', marginRight: '5%',}}></Input>
                    <Button type="primary" className='codeBnt'>获取验证码</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>注册</Button>
                </Form.Item>
            </Form>
        )
    }
}