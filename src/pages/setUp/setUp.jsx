import React, {Component} from 'react'
import './setUp.css'
import {Row, Col,  Table, Button, Modal, Form, Input, message} from 'antd'

import commonData from '../../common/DATA'
import {resetPassword} from '../../interface/user'
import {getUserCreateGroup} from '../../interface/userGroup'
import {stopUsingGroup, startUsingGroup, renameGroup} from '../../interface/group'


class setUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            columns: [],
            data: [],
            resetPassword: false,
            renameFlag: false,
            renameGID: ''
        }
        this.onFinish = this.onFinish.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount(){
        let that = this
        commonData.TABLECOLUMS.SETUP.forEach(ele=>{
            that.state.columns.push(ele)
        })
        if(commonData.TABLECOLUMS.SETUP.length === that.state.columns.length){
            that.state.columns.push({
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: action => (
                    <div key='action'>
                        {
                            action.using && <span data={action.GID}  style={{color: 'red', cursor: 'pointer'}} onClick={this.stopUsingGroup.bind(this, action.GID)}>停用</span>
                        }{
                            !action.using && <span data={action.GID}  style={{color: 'green', cursor: 'pointer'}} onClick={this.usingGroup.bind(this, action.GID)}>启用</span>
                        }
                        {
                            action.using && <span style={{fontSize: '16px'}}>|</span>
                        }
                        {
                            action.using && <span  style={{color: '#1890FF', cursor: 'pointer'}} onClick={this.rename.bind(action.GID).bind(this, action.GID)}>重命名</span>
                        }
                    </div>
                )
            })
        }
        getUserCreateGroup({
            token: localStorage.getItem('token')
        }).then(res=>{
            console.log(res)
            if(res.data.code === commonData.CODE.SUCCESS){
                let data = res.data.data.groupsName.filter(ele=>{
                    return ele.role === 'creator'
                })
                console.log(data)
    
                that.setState({
                    data: data
                })
                localStorage.setItem('token', res.data.data.token)
            }else{
                message.error(res.data.msg)
            }
            
        })
    }

    stopUsingGroup = (e) =>{
        console.log(e)
        let that = this
        stopUsingGroup({
            GID: e,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                localStorage.setItem('token', res.data.data.token)
                let data = []
                message.success(res.data.msg)
                that.state.data.forEach(ele=>{
                    if(ele.action.GID !== e){
                        data.push(ele)
                    }else{
                        data.push({
                            name: ele.name,
                            role: ele.role,
                            action: {
                                GID: ele.action.GID,
                                using: false
                            }
                        })
                    }
                })
                that.setState({
                    data: data
                })
            }
        })
    }

    usingGroup = (e) =>{
        let that = this
        startUsingGroup({
            GID: e,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                localStorage.setItem('token', res.data.data.token)
                let data = []
                message.success(res.data.msg)
                that.state.data.forEach(ele=>{
                    if(ele.action.GID !== e){
                        data.push(ele)
                    }else{
                        data.push({
                            name: ele.name,
                            role: ele.role,
                            action: {
                                GID: ele.action.GID,
                                using: true
                            }
                        })
                    }
                })
                that.setState({
                    data: data
                })
            }
        })
    }

    rename = (e) => {
        this.setState({
            renameFlag: true,
            renameGID: e
        })
    }

    renameGroup = (e) =>{
        console.log(e)
        let that = this
        let newName = that.refs.groupNewName.props.value || that.refs.groupNewName.state.value
        console.log(newName)
        renameGroup({
            name: newName,
            GID: that.state.renameGID,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                localStorage.setItem('token', res.data.data.token)
                let data = []
                message.success(res.data.msg)
                that.state.data.forEach(ele=>{
                    if(ele.action.GID !== e){
                        data.push(ele)
                    }else{
                        data.push({
                            name: newName,
                            role: ele.role,
                            action: ele.action
                        })
                    }
                })
                that.setState({
                    data: data,
                    renameGID: '',
                    renameFlag: false
                })
            }else{
                message.error(res.data.msg)
            }
        })
    }

    reset = (e) =>{
        this.setState({
            resetPassword: true,
            renameGID: ''
        })
    }

    onFinish = () =>{
        let that = this
        console.log(that.refs.oldPassword)
        let oldPassword = that.refs.oldPassword.props.value || that.refs.oldPassword.state.value
        let newPassword = that.refs.newPassword.props.value || that.refs.newPassword.state.value
        if(!oldPassword || !newPassword){
            message.error('请输入当前密码和新密码')
            return
        }
        resetPassword({
            oldPassword: oldPassword,
            newPassword: newPassword,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                that.setState({
                    resetPassword: false
                })
                localStorage.setItem('token', res.data.data.token)
                message.success('修改密码成功√')
            }else{
                message.error(res.data.msg)
            }
        })
    }

    closeModal(){
        this.setState({
            resetPassword: false,
            renameFlag: false
        })
    }

    render(){
        return (
            <div style={{paddingTop: '3%'}}>
                <Row className='row'  style={{marginBottom: '6%', paddingLeft:' 10px'}}>
                    <Col span={12}>
                        当前密码：******
                    </Col>
                    <Col span={12}>
                        <Button onClick={this.reset} style={{border:'none', backgroud: 'transparent'}}>修改密码</Button>
                    </Col>
                </Row>
                <Row className='row'>
                    <Table size='middle' className='dataTable' columns={this.state.columns} dataSource={this.state.data}></Table>
                </Row>
                <Modal title="修改密码" onCancel={this.closeModal} visible={this.state.resetPassword} footer={null}>
                    <Form onFinish={this.onFinish}>
                        <Form.Item label='当前密码' rules={[{
                            required: true,
                            message: '请输入当前密码'
                        }]} name='oldPassword'>
                            <Input.Password placeholder='请输入当前密码' ref='oldPassword'/>
                        </Form.Item>
                        <Form.Item label='修改密码' rules={[{
                            required: true,
                            pattern: /((?=.*[0-9])(?=.*[A-Za-z]))|((?=.*[0-9])(?=.*[!~@#$%^&*_.]))|((?=.*[A-Za-z])(?=.*[!~@#$%^&*_.]))^[0-9A-Za-z!~@#$%^&*_.]{6,32}$/,
                            message: '请输入长度为3~32的包含大小写字母、数字和特殊字符两种以上的密码'
                        }]} name='newPassword'>
                            <Input.Password placeholder='请输入新密码' ref='newPassword'/>
                        </Form.Item>
                        <Form.Item>
                            <Button block type='primary' onClick={this.onFinish}>修改密码</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal title="修改组名" onCancel={this.closeModal} visible={this.state.renameFlag} footer={null}>
                    <Form onFinish={this.renameGroup}>
                        <Form.Item label='新组名' rules={[{
                            required: true,
                            message: '请输入组名'
                        }]}>
                            <Input placeholder='请输入您要修改的组名' ref='groupNewName'/>
                        </Form.Item>
                            <Form.Item>
                                <Button block type='primary' onClick={this.renameGroup}>修改组名</Button>
                            </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default setUp