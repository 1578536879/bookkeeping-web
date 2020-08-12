import React, {Component} from 'react'
import {Table, Tag, Col, Button, Modal, Form, Input, message} from 'antd'
import { PlusOutlined,} from '@ant-design/icons'
import './groupMember.css'
import commonData from '../../common/DATA'
import {inviteUser, getGroupMember, deleteMember, upgradeMember, downgradeMember} from '../../interface/userGroup'

class groupMember extends Component{
    constructor(props){
        super(props)
        this.state = {
            columns: [],
            member:[],
            role: 'creator',
            modalVisible: false,
        }
        this.addMember = this.addMember.bind(this)
        this.close = this.close.bind(this)
        this.onFinish = this.onFinish.bind(this)
    }

    table(){
        let role = localStorage.getItem('role')
        let that = this
        commonData.TABLECOLUMS.GROUPMEMBER.forEach(ele=>{
            that.state.columns.push(ele)
        })
        if(commonData.TABLECOLUMS.GROUPMEMBER.length === this.state.columns.length){
            this.state.columns.push({
                title: '角色',
                dataIndex: 'role',
                key: 'role',
                render: role => (
                    // eslint-disable-next-line react/react-in-jsx-scope
                    <>  
                        {
                            // eslint-disable-next-line react/react-in-jsx-scope
                            role === commonData.ROLE.CREATOR && <Tag color='green'>创建者</Tag>
                        }{
                            // eslint-disable-next-line react/react-in-jsx-scope
                            role === commonData.ROLE.ADMINISTRATION && <Tag color='volcano'>管理员</Tag>
                        }{
                            // eslint-disable-next-line react/react-in-jsx-scope
                            role === commonData.ROLE.ORDINARY && <Tag color='geekblue'>组员</Tag>
                        }
                    </>
                )
            },{
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: action => (
                    // eslint-disable-next-line react/react-in-jsx-scope
                    <>
                        {
                            // eslint-disable-next-line react/react-in-jsx-scope
                            role === commonData.ROLE.CREATOR && action.role === commonData.ROLE.ORDINARY && 
                            <div>
                                <span className='deleteMember' onClick={this.deleteMember.bind(this, action)}>删除</span> 
                                <span> | </span>
                                <span className='administrator'  onClick={this.upgrade.bind(this, action)}>设为管理员</span>
                            </div>
                        } {
                            // eslint-disable-next-line react/react-in-jsx-scope
                            role === commonData.ROLE.CREATOR && action.role === commonData.ROLE.ADMINISTRATION &&
                            <div>
                                <span className='deleteMember' onClick={this.deleteMember.bind(this, action)}>删除</span> 
                                <span> | </span>
                                <span className='administrator'  onClick={this.Downgrade.bind(this, action)}>取消管理员</span>
                            </div>
                        }{
                            // eslint-disable-next-line react/react-in-jsx-scope
                            role === commonData.ROLE.ADMINISTRATION && action.role === commonData.ROLE.ORDINARY && <span className='deleteMember'>删除</span>
                        }
                    </>
                )
            })
        }
    }

    componentDidMount(){  
        // this.state.member['action'] = this.state.member.map(a => {return a.role})
        this.table()
        let that = this
        getGroupMember({
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                res.data.data.members.forEach(ele=>{
                    ele['action'] = {
                        role: ele.role,
                        UID: ele.UID
                    }
                })
                that.setState({
                    member: res.data.data.members
                })
            }else{
                message.error(res.data.msg)
            }   
        })
        console.log(this.state.member)
    }

    handleOk(){
        
    }

    close(){
        this.setState({
            modalVisible: false
        })
    }

    addMember(){
        this.setState({
            modalVisible: true
        })
    }

    deleteMember = (e) => {
        let that = this
        deleteMember({
            token: localStorage.getItem('token'),
            UID: e.UID
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                let data = that.state.member.filter(ele=>{
                    return ele.UID !== e.UID
                })
                that.setState({
                    member: data
                })
                message.success('删除成功√')
            }else{
                message.error(res.data.msg)
            }
        })
    }

    upgrade = (e) => {
        let that = this
        upgradeMember({
            token: localStorage.getItem('token'),
            UID: e.UID
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                let member = []
                that.state.member.forEach(ele=>{
                    console.log(ele.UID, e)
                    if(ele.UID === e.UID){
                        member.push({
                            ...ele,
                            role: commonData.ROLE.ADMINISTRATION,
                            action: {
                                UID: ele.UID,
                                role: commonData.ROLE.ADMINISTRATION
                            }
                        })
                    }else{
                        member.push(ele)
                    }
                })
                console.log(member)
                that.setState({
                    member: member
                })
                message.success(res.data.msg)
            }else{
                message.error(res.data.msg)
            }
        })
    }

    Downgrade = (e) => {
        let that = this
        downgradeMember({
            token: localStorage.getItem('token'),
            UID: e.UID
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                let member = []
                that.state.member.forEach(ele=>{
                    console.log(ele.UID, e)
                    if(ele.UID === e.UID){
                        member.push({
                            ...ele,
                            role: commonData.ROLE.ORDINARY,
                            action: {
                                UID: ele.UID,
                                role: commonData.ROLE.ORDINARY
                            }
                        })
                    }else{
                        member.push(ele)
                    }
                })
                console.log(member)
                that.setState({
                    member: member
                })
                message.success(res.data.msg)
            }else{
                message.error(res.data.msg)
            }
        })
    }

    onFinish(){        
        let that = this
        console.log(that.refs)
        let email = that.refs.email.props.value || that.refs.email.state.value
        let parn = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(!parn.test(email)){
            message.error('请输入合法的电子邮箱')
            return 
        }
        inviteUser({
            email: email,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success(res.data.msg)
            }else{
                message.error(res.data.msg)
            }
            that.setState({
                modalVisible: false
            })
        })
    }

    render(){
        return (
            // eslint-disable-next-line react/react-in-jsx-scope
           <div style={{marginTop: '5%'}}>
               <Col span={22} className='add-col'>
                    <Button type='primary' icon={<PlusOutlined />} onClick={this.addMember}>邀请新组员</Button>
                </Col>
                <Col span={22} className='table-col'>
                    <Table columns={this.state.columns} dataSource={this.state.member}></Table>
                </Col>
                <Modal  title="邀请组员" visible={this.state.modalVisible} onOk={this.handleOk} style={{width: '95%',margin: 'auto'}} footer={null} onCancel={this.close}>
                    <Form onFinish={this.onFinish}>
                        <Form.Item label='组员邮箱' rules={[{
                            required: true,
                            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '邮箱格式错误'
                        }]} style={{width: '90%', margin: 'auto', marginBottom: '10px'}}>
                            <Input ref='email' placeholder='请输入被邀请组员邮箱'/>
                        </Form.Item>
                        <Form.Item style={{width: '90%', margin: 'auto'}}>
                            <Button block type='primary' onClick={this.onFinish}>邀请组员</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div> 
        )
    }
}

export default groupMember