import React, { Component } from "react";
import {Input, Button, Form, message} from 'antd'
import {LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import './register.css'
import Axios from 'axios'
import qs from 'qs'
import enviorment from '../../common/enviornment'
import md5 from 'js-md5'

export default class Register extends Component{
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
        this.getCode = this.getCode.bind(this)
        this.state = {
            email: '',
            password: '',
            code: '',
            username: '',
            codeDisabled: false,
            codeMsg: '点击获取验证码',
            codeStyle: {
                width: '55%',
                marginRight: '4%',
                marginBottom: '10px',
            }
        }
    }

    getCode = (e) =>{
        console.log(enviorment)
        let email = this.refs.email.props.value || this.refs.email.state.value
        if(!email){
            message.error('请输入您的邮箱地址!')
            return 
        }
        this.setState({
            email: email
        })
        let that = this
        let second = 60
        let interval = setInterval(function(){
            second--
            that.setState({
                codeMsg: second + "s后重新获取"
            })
        }, 1000)
        setTimeout(function(){
            clearInterval(interval)
            that.setState({
                codeDisabled: false,
                codeMsg: '点击获取验证码'
            })
        }, 1000 * 60)
        this.setState({
            codeDisabled: true,
            codeMsg: second + "s后重新获取"
        })
        Axios({
            method: 'post',
            url: `http://${enviorment.hostname}:${enviorment.port}/getRegisterCode`,
            data: qs.stringify({
                email: email
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        }).then(res=>{
            console.log(res)
            if(res.data.code === 200){
                message.success('验证码发送成功，请到邮箱查看~')
            }
        })
    }

    register(){
        console.log(this.state)
        let password = this.refs.password.props.value || this.refs.password.state.value
        let pos = Math.floor(Math.random()*password.length)
        password = password.substr(0, pos) + md5('BookKeeping') + password.substr(pos, password.length - pos)
        password = btoa(password)
        this.setState({
            password: password,
            email: this.refs.email.props.value || this.refs.email.state.value,
            username: this.refs.username.props.value || this.refs.username.state.value,
            code: this.refs.code.props.value || this.refs.code.state.value
        })
        let that = this
        Axios({
            method: 'post',
            url: `http://${enviorment.hostname}:${enviorment.port}/register`,
            data: qs.stringify({
                email: that.state.email,
                password: that.state.password,
                username: that.state.username,
                code: that.state.code,
                pos: pos
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        }).then(res=>{
            console.log(res)
        })
    }

    render(){
        return (
            <Form className='register' style={{margin: 'auto'}} onFinish={this.register} >
                <Form.Item name='email' rules={[{
                    required: true,
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '邮箱格式错误'
                }]} style={{marginBottom: '10px'}}>
                    <Input prefix={<MailOutlined />} placeholder='请输入邮箱' ref='email'></Input>
                </Form.Item>
                <Form.Item style={{marginBottom: '10px'}} name='username' rules={[{
                    required: true,
                    pattern: /^[A-Za-z0-9_]{3,32}$/,
                    message: '请输入包含大小写字母、数字和下划线,长度为3~32的用户名'
                }]}>
                    <Input prefix={<UserOutlined />} placeholder="请输入用户名" ref='username'/>
                </Form.Item>
                <Form.Item name="password" style={{marginBottom: '10px'}} rules={[{
                    required: true,
                    pattern: /((?=.*[0-9])(?=.*[A-Za-z]))|((?=.*[0-9])(?=.*[!~@#$%^&*_.]))|((?=.*[A-Za-z])(?=.*[!~@#$%^&*_.]))^[0-9A-Za-z!~@#$%^&*_.]{6,32}$/,
                    message: '请输入长度为3~32的包含大小写字母、数字和特殊字符两种以上的密码'
                }]}>
                    <Input.Password prefix={<LockOutlined/>}  type="password" placeholder="请输入密码" ref='password'/>
                </Form.Item>

                <Form.Item style={{marginBottom: '10px'}} name='code'>
                    <Input placeholder='验证码' style={{width: '53%', marginRight: '5%'}} ref='code'></Input>
                    <Button type="primary" className='codeBnt' disabled={this.state.codeDisabled} onClick={this.getCode} style={{padding: '0'}}>{this.state.codeMsg}</Button>
                </Form.Item>
                <Form.Item name='register'>
                    <Button type="primary" htmlType="submit" block>注册</Button>
                </Form.Item>
            </Form>
        )
    }
}