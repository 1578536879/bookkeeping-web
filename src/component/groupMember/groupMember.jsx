import React, {Component} from 'react'
import {Table, Tag, Col, Button, Modal, Form, Input} from 'antd'
import { PlusOutlined,} from '@ant-design/icons'

import './groupMember.css'
import commonData from '../../common/DATA'

class groupMember extends Component{
    constructor(props){
        super(props)
        this.state = {
            columns: commonData.TABLECOLUMS.GROUPMEMBER,
            member:[{
                role: 'creator',
                email: '1578536879@qq.com',
                name: '123',
            },{
                role: 'common',
                email: '1578536879@qq.com',
                name: '123'
            },{
                role: 'administrator',
                email: '1578536879@qq.com',
                name: '123'
            }],
            role: 'creator',
            modalVisible: false,
        }
        this.addMember = this.addMember.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount(){
        let role = this.state.role
        console.log( this.state.columns)
        this.state.columns.push({
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            render: role => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <>  
                    {
                        // eslint-disable-next-line react/react-in-jsx-scope
                        role === 'creator' && <Tag color='green'>创建者</Tag>
                    }{
                        // eslint-disable-next-line react/react-in-jsx-scope
                        role === 'administrator' && <Tag color='volcano'>管理员</Tag>
                    }{
                        // eslint-disable-next-line react/react-in-jsx-scope
                        role === 'common' && <Tag color='geekblue'>组员</Tag>
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
                        role === 'creator' && action === 'common' && 
                        <div>
                            <span className='deleteMember'>删除</span> 
                            <span> | </span>
                            <span className='administrator'>设为管理员</span>
                        </div>
                    } {
                        // eslint-disable-next-line react/react-in-jsx-scope
                        role === 'creator' && action === 'administrator' &&
                        <div>
                            <span className='deleteMember'>删除</span> 
                            <span> | </span>
                            <span className='administrator'>取消管理员</span>
                        </div>
                    }{
                        // eslint-disable-next-line react/react-in-jsx-scope
                        role === 'administrator' && action === 'common' && <span className='deleteMember'>删除</span>
                    }
                </>
            )
        })
        // this.state.member['action'] = this.state.member.map(a => {return a.role})
        this.state.member.forEach(ele=>{
            ele['action'] = ele.role
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
        console.log(this.state.modalVisible)
    }

    onFinish(){

    }

    render(){
        return (
            // eslint-disable-next-line react/react-in-jsx-scope
           <div>
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
                            <Input value={this.state.content} placeholder='请输入被邀请组员邮箱'/>
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