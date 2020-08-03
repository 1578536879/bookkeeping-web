import React, {Component} from 'react'
import './home.css'
import {Menu, Dropdown, Row, Col, Avatar,Popover, Table, Button, Modal, message} from 'antd'
import {DownOutlined, PlusOutlined, TeamOutlined, UserOutlined, PlusCircleOutlined} from '@ant-design/icons'
import CreateGroupComponent from '../../component/createGroup/createGroup'
import AddBill from '../../component/addBill/addBill'
import {getUserCreateGroup} from '../../interface/userGroup'
import commonData from '../../common/DATA'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            userID: '12321342342314',
            groups: '',
            onShow: '个人',
            visible: false,
            createGroupVisible: false,
            content: '',
            columns: commonData.TABLECOLUMS.HOME,
            data: [{
                key: 1,
                content: '午餐',
                price: '12.1',
                date: '2020/4/10 12:59',
                name: 'my',
                other: {
                    picture: '查看',
                    BKID: '124321523465745543123'
                }
            }],
            modalVisible: false,
            groups: []
        }
        this.logout = this.logout.bind(this)
    }

    personSetting = ()=>{
        this.props.history.push({
            pathname: '/set-up',
        })
    }

    componentDidMount(){
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.columns.push({
            title: '账单操作',
            dataIndex: 'other',
            render: (content) =>(
                <span>
                    <span className='other' onClick={this.picture.bind(this, content)}>{content.picture}</span>&nbsp;&nbsp;
                    <span className='other' onClick={this.delete.bind(this, content)}>删除</span>
                </span>
            )
        })
        let that = this
        let buffer = []
        buffer.push(<Menu.Item key="person"><UserOutlined />个人</Menu.Item>)
        getUserCreateGroup({
            token: localStorage.getItem('token')
        }).then(res=>{
            console.log(res)
            if(res.data.code === commonData.CODE.SUCCESS){
                res.data.data.groupsName.forEach((ele, index)=>{
                    // eslint-disable-next-line react/react-in-jsx-scope
                    buffer.push(<Menu.Divider></Menu.Divider>)
                    buffer.push(<Menu.Item key={ele.index} ><TeamOutlined />{ele.name}</Menu.Item>)
                    console.log(buffer)
                })
                buffer.push(<Menu.Divider></Menu.Divider>)
                buffer.push(<Menu.Item key='add' ><PlusCircleOutlined />新建组</Menu.Item>)
                that.setState({
                    groups: (<Menu onClick={that.handleMenuClick} className='menu'>
                                {buffer}
                            </Menu>),
                    content: (
                        <div>
                            <p className='choose' onClick={this.personSetting}>个人设置</p>
                            <p className='choose' onClick={this.logout}>退出登录</p>
                        </div>
                    )
                })
                localStorage.setItem('token', res.data.data.token)
            }else{
                message.error(res.data.msg)
            }
        })
       
    }

    

    handleMenuClick = (e) => {
        console.log(e)
        if(e.key === 'person'){
            this.setState({
                onShow: '个人'
            })
        }else if(e.key === 'add'){
            this.setState({
                createGroupVisible: true
            })
        }else{
            let groupName = this.state.groups[e.key]
            this.setState({
                onShow: groupName
            })
        }
    }

    hide = () => {
        this.setState({
          visible: false,
        });
    }

    logout(){
        localStorage.removeItem('token')
        this.props.history.push({
            pathname: '/'
        })
    }

    handleVisibleChange = visible => {
        this.setState({ visible });
    }    

    picture = (e) => {
        console.log(e)
    }

    delete = (e) => {
        console.log(e)
    }

    addBK = () => {
        this.setState({
            modalVisible: true
        })
    }

    closeBK = () => {
        this.setState({
            modalVisible: false
        })
    }

    onFinish = () => {
        this.setState({
            modalVisible: false
        })
    }

    onCreateGroupFinish = () =>{
        this.setState({
            createGroupVisible: false
        })
    }

    closeCreateGroup = () =>{
        this.setState({
            createGroupVisible: false
        })
    }

    render(){
        console.log(this.state.groups)
        return (
            <div>
                <Row className='header'>
                    <Col span={12} className='groups-col'>
                        <Dropdown overlay={this.state.groups} trigger={['click']} >
                            <span>{this.state.onShow}&nbsp;&nbsp;<DownOutlined className='group-col'/></span>
                        </Dropdown>
                    </Col>
                    <Col span={12} className='avater-col'>
                        <Popover trigger="click" visible={this.state.visible} onVisibleChange={this.handleVisibleChange} content={this.state.content}>
                            <Avatar className='avater' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">U</Avatar>
                        </Popover>
                    </Col>
                </Row>
                <Row>
                    <Col span={22} className='add-col'>
                        <Button type='primary' icon={<PlusOutlined />} onClick={this.addBK}>添加账单</Button>
                    </Col>
                    <Col span={22} className='table-col'>
                        <Table columns={this.state.columns} dataSource={this.state.data}>
                        </Table>
                    </Col>
                </Row>
                <Modal title="添加账单信息" visible={this.state.modalVisible} onOk={this.handleOk} style={{width: '95%',margin: 'auto'}} footer={null} onCancel={this.closeBK}>
                    <AddBill onFinish={this.onFinish}/>
                </Modal>
                <Modal title="添加组" visible={this.state.createGroupVisible} footer={null} onCancel={this.closeCreateGroup}>
                    <CreateGroupComponent onCreateGroupFinish={this.onCreateGroupFinish}/>
                </Modal>
            </div>
        )
    }
}

export default Home

