import React, { Component } from "react";
import {Input, Button, Form, message} from 'antd'
import {LockOutlined, MailOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import './login.css'
import Axios from 'axios'
import qs from 'qs'
import enviornment from '../../common/enviornment'
import md5 from 'js-md5'
import commonData from '../../common/DATA'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this)
    }

    login(){
        let that = this
        let password = that.refs.password.props.value || that.refs.password.state.value
        let pos = Math.floor(Math.random()*password.length)
        password = password.substr(0, pos) + md5('BookKeeping') + password.substr(pos, password.length - pos)
        password = btoa(password)
        this.setState({
            email: that.refs.email.props.value || that.refs.email.state.value,
            password: password
        })
        Axios({
            method: 'post',
            url: `http://${enviornment.hostname}:${enviornment.port}/login`,
            data: qs.stringify({
                email: that.state.email,
                password: that.state.password,
                pos: pos
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            console.log(res)
            if(res.data.code === commonData.CODE.SUCCESS){
                localStorage.setItem("token", res.data.data.token)
                this.props.history.push({
                    pathname: '/home',
                })
            }else{
                message.error(res.data.data.msg)
            }
            
        }).catch(err=>{
            console.log(err)
        })
       
    }

    render(){
        return (
            <Form className='login' style={{margin: 'auto'}} onFinish={this.login}>
                <Form.Item name='email' rules={[{
                    required: true,
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '邮箱格式错误'
                }]}>
                    <Input prefix={<MailOutlined />} placeholder='请输入邮箱' value={this.state.email}  ref="email"></Input>
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password prefix={<LockOutlined/>}  type="password" placeholder="请输入密码" value={this.state.password}  ref="password"/>
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