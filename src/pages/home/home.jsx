import React, {Component} from 'react'
import './home.css'
import {Menu, Dropdown, Row, Col, Avatar,Popover, Modal, message} from 'antd'
import {DownOutlined, TeamOutlined, UserOutlined, PlusCircleOutlined, PieChartOutlined, PayCircleOutlined} from '@ant-design/icons'
import CreateGroupComponent from '../../component/createGroup/createGroup'
import ShowBill from '../../component/showBill/showBill'
import {getUserCreateGroup} from '../../interface/userGroup'
import {switchGroup} from '../../interface/user'
import commonData from '../../common/DATA'
import GroupMember from '../../component/groupMember/groupMember'
import BillClassification from '../../component/billClassification/billClassification'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            userID: '12321342342314',
            groups: '',
            onShow: '',
            visible: false,
            createGroupVisible: false,
            content: '',            
            groups: [],
            groupsItem: [],
            groupsData: [],
            menuKey: ['newBill'],
            component: <ShowBill />
        }
        this.logout = this.logout.bind(this)
        this.newBill = this.newBill.bind(this)
        this.billClassification = this.billClassification.bind(this)
        this.groupMember = this.groupMember.bind(this)
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
                let group = ''
                res.data.data.groupsName.forEach((ele, index)=>{
                    // eslint-disable-next-line react/react-in-jsx-scope
                    if(!ele.action.using){
                        return 
                    }
                    if(ele.action.GID === res.data.data.GID){
                        group = ele.name
                    }
                    buffer.push(<Menu.Divider></Menu.Divider>)
                    buffer.push(<Menu.Item key={index} ><TeamOutlined />{ele.name}</Menu.Item>)
                    console.log(buffer)
                })
                that.state.groupsItem = buffer
                buffer.push(<Menu.Divider></Menu.Divider>)
                buffer.push(<Menu.Item key='add' ><PlusCircleOutlined />新建组</Menu.Item>)
                that.setState({
                    groups: (<Menu onClick={that.handleMenuClick} className='menu'>
                                {that.state.groupsItem}
                            </Menu>),
                    content: (
                        <div>
                            <p className='choose' onClick={this.personSetting}>个人设置</p>
                            <p className='choose' onClick={this.logout}>退出登录</p>
                        </div>
                    ),
                    groupsData: res.data.data.groupsName,
                    onShow: group || '个人'
                })
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('group', group || 'person')
            }else{
                message.error(res.data.msg)
                that.props.history.push('/')
            }
        })
       
    }

    switch(data){
        let that = this
        switchGroup({
            group: data,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success('切换成功√')
                localStorage.setItem('group', data)
                localStorage.setItem('role', res.data.data.role)
                localStorage.setItem('token', res.data.data.token)
                console.log(that.state.menuKey)
                if(that.state.menuKey[0] === 'newBill' || (data === 'person' && that.state.menuKey[0]  === 'groupMember')){
                    that.setState({
                        menuKey: ['newBill'],
                        component: <ShowBill key={Math.random()}/>
                    })
                }else if(that.state.menuKey[0] === 'billClassification'){
                    that.setState({
                        component: <BillClassification key={Math.random()} />
                    })
                }else{
                    that.setState({
                        component: <GroupMember key={Math.random()}/>
                    })
                }
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
            this.switch('person')
        }else if(e.key === 'add'){  
            this.setState({
                createGroupVisible: true
            })
        }else{
            console.log(parseInt(e.key), this.state.groupsData)
            let groupName = this.state.groupsData[parseInt(e.key)]
            console.log(groupName)
            this.setState({
                onShow: groupName.name
            })
            this.switch(groupName.action.GID)
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

    onCreateGroupFinish = (data) =>{
        if(data){
            console.log(data)
            let that = this
            let item = this.state.groupsItem
            let d = this.state.groupsData
            item = item.slice(0, item.length - 3).concat(
                <Menu.Item key={data.GID} ><TeamOutlined />{data.name}</Menu.Item>).concat(item.slice(item.length - 2, item.length))
            
            d.push(data)
            this.setState({
                groups: (<Menu onClick={that.handleMenuClick} className='menu'>
                                {item}
                            </Menu>),
                groupsData: d,
                groupsItem: item,
                onShow: data.name
            })
        }
        this.setState({
            createGroupVisible: false
        })
    }

    closeCreateGroup = () =>{
        this.setState({
            createGroupVisible: false
        })
    }

    newBill(){
        this.setState({
            component: <ShowBill />
        })
    }

    billClassification(){
        this.setState({
            component: <BillClassification />
        })
    }

    groupMember(){
        this.setState({
            component: <GroupMember />
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
                        <Menu.Item onClick={this.newBill} style={{height: '55px',lineHeight: '55px'}} key='newBill'><PayCircleOutlined />最新账单</Menu.Item>
                        <Menu.Item onClick={this.billClassification} style={{height: '55px', lineHeight: '55px'}}  key='billClassification'><PieChartOutlined  />账单归类</Menu.Item>
                        {
                            this.state.onShow !== '个人' && <Menu.Item style={{height: '55px', lineHeight: '55px'}} key='groupMember' onClick={this.groupMember}><TeamOutlined />查看组员</Menu.Item>
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

