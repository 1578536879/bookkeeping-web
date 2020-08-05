import React, {Component} from 'react'
import './home.css'
import {Menu, Dropdown, Row, Col, Avatar,Popover, Modal, message} from 'antd'
import {DownOutlined, TeamOutlined, UserOutlined, PlusCircleOutlined, PieChartOutlined, PayCircleOutlined} from '@ant-design/icons'
import CreateGroupComponent from '../../component/createGroup/createGroup'
import ShowBill from '../../component/showBill/showBill'
import {getUserCreateGroup} from '../../interface/userGroup'
import commonData from '../../common/DATA'
import GroupMember from '../../component/groupMember/groupMember'
import BillClassification from '../../component/billClassification/billClassification'

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
            groups: [],
            menuKey: ['newBill'],
            component: <BillClassification />
        }
        this.logout = this.logout.bind(this)
    }

    personSetting = ()=>{
        this.props.history.push({
            pathname: '/set-up',
        })
    }

    componentDidMount(){
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
            <div style={{height: '100%'}}>
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

                <Row style={{height: '92%'}}>
                    <Col flex={1} style={{height: '100%', background: 'white', paddingTop: '3%'}}>
                    <Menu defaultSelectedKeys={this.state.menuKey} >
                        <Menu.Item style={{height: '55px',
    lineHeight: '55px'}} key='newBill'><PayCircleOutlined />最新账单</Menu.Item>
                        <Menu.Item style={{height: '55px',
    lineHeight: '55px'}}  key='billClassification'><PieChartOutlined  />账单归类</Menu.Item>
                        {
                            this.state.onShow !== '个人' && <Menu.Item key='groupMember'><TeamOutlined />查看组员</Menu.Item>
                        }
                    </Menu>
                    </Col>
                    <Col flex={8}> 
                        {this.state.component}
                    </Col>
                </Row>
                <Modal title="添加组" visible={this.state.createGroupVisible} footer={null} onCancel={this.closeCreateGroup}>
                    <CreateGroupComponent onCreateGroupFinish={this.onCreateGroupFinish}/>
                </Modal>
            </div>
        )
    }
}

export default Home

