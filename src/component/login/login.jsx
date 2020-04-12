import React, { Component } from "react";
import {Input, Button, Form} from 'antd'
import {LockOutlined, MailOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import './login.css'

class Login extends Component{
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
            <Form className='login' style={{margin: 'auto'}} onClick={this.login}>
                <Form.Item name='email' rules={[{
                    required: true,
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '邮箱格式错误'
                }]}>
                    <Input prefix={<MailOutlined />} placeholder='请输入邮箱' value={this.state.email}></Input>
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password prefix={<LockOutlined/>}  type="password" placeholder="请输入密码" value={this.state.password} />
                </Form.Item>
                <Form.Item  className='forget'>
                    <span className="login-form-forgot">忘记密码</span>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" >登陆</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(Login)