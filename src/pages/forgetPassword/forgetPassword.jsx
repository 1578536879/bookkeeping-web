import React, {Component} from 'react';
import './forgetPassword.css'
import {Form, Input, Button, message } from 'antd';
import {LockOutlined, MailOutlined} from '@ant-design/icons'
import {getForgetPasswordCode} from '../../interface/code'
import {forgetPassword} from '../../interface/user'
import commonData from '../../common/DATA'


class forgetPasswordComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            code: '',
            percent: 0,
            codeMsg: '获取验证码'
        }
        this.getCode = this.getCode.bind(this)
        this.onFinish = this.onFinish.bind(this)
    }

    onFinish(){
        let that = this
        let email = that.refs.email.props.value || that.refs.email.state.value
        let code = that.refs.code.props.value || that.refs.code.state.value 
        let password = that.refs.password.props.value || that.refs.password.state.value 
        forgetPassword({
            email: email,
            code: code,
            password: password
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success(res.data.msg)
                setTimeout(() => {
                    that.props.history.push('/')
                }, 1000);
            }else{
                message.error(res.data.msg)
            }
            console.log(res)
        })
    }

    getCode(){
        let that = this
        let email = that.refs.email.props.value || that.refs.email.state.value
        console.log(email)
        getForgetPasswordCode({
            email: email
        }).then(res=>{
            console.log(res)
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success('发送验证码成功√')
            }else{
                message.error(res.data.msg)
            }
        })
    }

    render(){
        return (
            <div className='forgetDiv'>
                <Form>
                    <Form.Item name='email' rules={[{
                        required: true,
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: '邮箱格式错误'
                    }]} style={{width: '98%', margin: 'auto', marginBottom: '24px'}}>
                        <Input prefix={<MailOutlined />} placeholder='请输入邮箱' value={this.state.email}  ref="email"></Input>
                    </Form.Item>
                    <Form.Item name="password">
                        <Input.Password prefix={<LockOutlined/>}  type="password" placeholder="请输入新的密码"  ref="password"/>
                    </Form.Item>
                    <Form.Item style={{marginBottom: '24px'}} name='code'>
                        <Input placeholder='验证码' style={{width: '53%', marginRight: '5%'}} ref='code'></Input>
                        <Button type="primary" className='codeBnt' disabled={this.state.codeDisabled} onClick={this.getCode} style={{padding: '0'}}>{this.state.codeMsg}</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button block onClick={this.onFinish} type="primary" htmlType="submit" className="login-form-button" >确定</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default forgetPasswordComponent