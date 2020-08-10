import React, {Component} from 'react'
import './inviteUser.css'
import { Input, Button, Form, message} from 'antd'
import { MailOutlined } from '@ant-design/icons'
import {inviteEffective} from '../../interface/userGroup'
import commonData from '../../common/DATA'

class inviteUser extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
        this.onFinish = this.onFinish.bind(this)
    }

    onFinish(){
        let that = this
        let email = that.refs.email.props.value || that.refs.email.state.value
        let path = window.location.href
        let index = path.lastIndexOf('/')
        let id = path.substr(index+1, path.length)
        console.log(path, index, id)
        inviteEffective({
            email: email,
            id: id,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success('邀请成功√')
                that.props.history.push('/')
            }else{
                message.error(res.data.msg)
            }
        })
    }

    // eslint-disable-next-line react/require-render-return
    render(){
        return (
            <div>
                <Form onFinish={this.onFinish} className='form'>
                    <Form.Item >
                        邀请入组
                    </Form.Item>
                    <Form.Item name='email' rules={[{
                        required: true,
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: '邮箱格式错误'
                    }]} label='被邀请人邮箱：'>
                        <Input prefix={<MailOutlined />} placeholder='请输入您的邮箱'  ref="email" ></Input>
                    </Form.Item>
                    <Form.Item name="password">
                        <Button block type='primary' onClick={this.onFinish}>确定加入组</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default inviteUser