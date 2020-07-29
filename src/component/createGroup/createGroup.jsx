import React, { Component } from "react"
import {Form, Input, message, Button} from 'antd'
import commonData  from '../../common/DATA'
import {createGroup} from '../../interface/userGroup'

class CreateGroupComponent extends Component{
    constructor(props){
        super(props)
        this.onFinish = this.onFinish.bind(this)
    }

    onFinish(){
        let that = this
        createGroup({
            name: that.refs.groupName.props.value || that.refs.groupName.state.value,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success('创建成功!')
            }else{
                message.error(res.data.msg)
            }
            that.props.onCreateGroupFinish()
        })
    }

    render(){
        return (
            <Form onFinish={this.onFinish}>
                <Form.Item label='组名' rules={[{
                    required: true,
                    message: '请输入组名'
                }]}>
                    <Input placeholder='请输入您创建的组名' ref='groupName'/>
                </Form.Item>
                <Form.Item>
                    <Button block type='primary' onClick={this.onFinish}>创建组</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default CreateGroupComponent