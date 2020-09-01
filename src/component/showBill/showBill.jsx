import React, {Component} from 'react'
import './showBill.css'
import {Row, DatePicker, Col, Table, Button, Modal, message, Popconfirm, Input, Select} from 'antd'
import { PlusOutlined,QuestionCircleOutlined, AimOutlined } from '@ant-design/icons'
import AddBill from '../../component/addBill/addBill'
import commonData from '../../common/DATA'
import {getUserBill, deleteUserBill, findUserBill, queryUserBill} from '../../interface/userBill'
import {getGroupBill, deleteGroupBill, findGroupBill, queryGroupBill} from '../../interface/groupBill'
import enviornment from '../../common/enviornment'
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment'
const { RangePicker } = DatePicker 
const { Search } = Input;
const { Option } = Select
moment.locale('en', {
    week: {
      dow: 1,
    },
  });

class showBill extends Component{
    constructor(props){
        super(props)
        this.state = {
            columns: [],
            modalVisible: false,
            data: [],
            image: {
                path: '',
                name: ''
            },
            billVisible: false,
            role: '',
            select: 'find',
            name: '',
            date: [],
            skip: 0
        }
        this.onFinish = this.onFinish.bind(this)
        this.setType = this.setType.bind(this)
        this.setDate = this.setDate.bind(this)
        this.search = this.search.bind(this)
        this.query = this.query.bind(this)
    }

    componentDidMount(){
        // eslint-disable-next-line react/no-direct-mutation-state
        console.log(this.state.columns.length, commonData.TABLECOLUMS.HOME.length)
        let that = this
        commonData.TABLECOLUMS.HOME.forEach(ele=>{
            this.state.columns.push(ele)
        })
        let role = localStorage.getItem('role')
        if(this.state.columns.length === commonData.TABLECOLUMS.HOME.length){
            this.state.columns.push({
                title: '账单操作',
                dataIndex: 'action',
                render: (action) =>(
                    <span>
                        {action.imagePath !== 'http://' + enviornment.hostname + ':' + enviornment.port + '/' && <span className='other' onClick={this.picture.bind(this, action.imagePath)}>查看账单图片</span>}
                        &nbsp;&nbsp;
                       {role !== commonData.ROLE.ORDINARY && <Popconfirm title="确认删除此账单？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}  onConfirm={this.delete.bind(this,action)}>
                            <span className='delete'>删除</span>
                        </Popconfirm>}
                        
                    </span>
                )
            })
        }
        this.setState({
            role: role
        })
        if(localStorage.getItem('group') === 'person'){
            getUserBill({
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code === commonData.CODE.SUCCESS){
                    let data = []
                    res.data.data.data.forEach(ele=>{
                        data.push({
                            ...ele,
                            date: new Date(parseInt(ele.date)).toLocaleString(),
                            name: ele.recorder,
                            action: {
                                imagePath: 'http://' + enviornment.hostname + ':' + enviornment.port + '/' + ele.imagePath,
                                BID: ele.BID
                            }
                        })
                    })
                    that.setState({
                        data: data
                    })
                }else{
                    message.error(res.data.msg)
                }
            })
        }else{
            getGroupBill({
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code === commonData.CODE.SUCCESS){
                    let data = []
                    res.data.data.data.forEach(ele=>{
                        data.push({
                            ...ele,
                            date: new Date(parseInt(ele.date)).toLocaleString(),
                            action: {
                                imagePath: 'http://' + enviornment.hostname + ':' + enviornment.port + '/' + ele.imagePath,
                                BID: ele.BID
                            },
                            name: ele.recorder
                        })
                    })
                    that.setState({
                        data: data
                    })
                }else{
                    message.error(res.data.msg)
                }
            })
        }
    }

    picture = (e) => {
        console.log(e)
        let name = e.indexOf('&&')
        name = e.substr(name+1, e.length)
        this.setState({
            image: {
                path: e,
                name: name
            },
            billVisible: true
        })
    }

    delete = (e) => {
        console.log(e)
        let that = this
        if(localStorage.getItem('group') === 'person'){
            deleteUserBill({
                BID: e.BID,
                path: e.imagePath,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code === commonData.CODE.SUCCESS){
                    message.success('删除账单成功√')
                    let data = that.state.data.filter(ele=>{
                        return ele.BID !== e.BID
                    })
                    that.setState({
                        data: data
                    })
                    localStorage.setItem('token', res.data.data.token)
                }else{
                    message.error(res.data.msg)
                }
            })
        }else{
            deleteGroupBill({
                BID: e.BID,
                path: e.imagePath,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code === commonData.CODE.SUCCESS){
                    message.success('删除账单成功√')
                    let data = that.state.data.filter(ele=>{
                        return ele.BID !== e.BID
                    })
                    that.setState({
                        data: data
                    })
                    localStorage.setItem('token', res.data.data.token)
                }else{
                    message.error(res.data.msg)
                }
            })
        }
        
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

    handleCancel = () => {
        this.setState({
            billVisible: false
        })
    }

    onFinish(data){
        console.log(data)
        let d = this.state.data
        d.push(data)
        console.log(d)
        this.setState({
            modalVisible: false,
            data: d
        })
    }

    setType(e){
        this.setState({
            select: e
        })
    }

    setDate(e, str){
        console.log(e, str)
        this.setState({
            date: str
        })
    }

    search(name){
        let that = this
        if(localStorage.getItem('group') === 'person'){
            findUserBill({
                name: name,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code !== commonData.CODE.SUCCESS){
                    message.error(res.data.msg)
                }else{
                    let data = []
                    res.data.data.data.forEach(ele=>{
                        data.push({
                            ...ele,
                            date: new Date(parseInt(ele.date)).toLocaleString(),
                            name: ele.recorder,
                            action: {
                                imagePath: 'http://' + enviornment.hostname + ':' + enviornment.port + '/' + ele.imagePath,
                                BID: ele.BID
                            }
                        })
                    })
                    that.setState({
                        data: data
                    })
                }
            })
        }else{
            findGroupBill({
                name: name,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code !== commonData.CODE.SUCCESS){
                    message.error(res.data.msg)
                }else{
                    let data = []
                    res.data.data.data.forEach(ele=>{
                        data.push({
                            ...ele,
                            date: new Date(parseInt(ele.date)).toLocaleString(),
                            name: ele.recorder,
                            action: {
                                imagePath: 'http://' + enviornment.hostname + ':' + enviornment.port + '/' + ele.imagePath,
                                BID: ele.BID
                            }
                        })
                    })
                    that.setState({
                        data: data
                    })
                }
            })
        }
        
    }

    query(){
        let startTime = this.state.date[0]
        let endTime = this.state.date[1]
        startTime = new Date(startTime).getTime()
        endTime = new Date(endTime).getTime()
        let that = this
        if(localStorage.getItem('group') === 'person'){
            queryUserBill({
                startTime: startTime,
                endTime: endTime,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code !== commonData.CODE.SUCCESS){
                    message.error(res.data.msg)
                }else{
                    let data = []
                    res.data.data.data.forEach(ele=>{
                        data.push({
                            ...ele,
                            date: new Date(parseInt(ele.date)).toLocaleString(),
                            name: ele.recorder,
                            action: {
                                imagePath: 'http://' + enviornment.hostname + ':' + enviornment.port + '/' + ele.imagePath,
                                BID: ele.BID
                            }
                        })
                    })
                    that.setState({
                        data: data
                    })
    
                }
            })
        }else{
            queryGroupBill({
                startTime: startTime,
                endTime: endTime,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code !== commonData.CODE.SUCCESS){
                    message.error(res.data.msg)
                }else{
                    let data = []
                    res.data.data.data.forEach(ele=>{
                        data.push({
                            ...ele,
                            date: new Date(parseInt(ele.date)).toLocaleString(),
                            name: ele.recorder,
                            action: {
                                imagePath: 'http://' + enviornment.hostname + ':' + enviornment.port + '/' + ele.imagePath,
                                BID: ele.BID
                            }
                        })
                    })
                    that.setState({
                        data: data
                    })
    
                }
            })
        }
        
    }

    render(){
        return (
            <div style={{marginTop: '5%'}}>
                {this.state.role !== commonData.ROLE.ORDINARY && 
                <Col span={22} className='add-col'>
                    <Row>
                        <Col span={4}>
                            <Select value={this.state.select} onChange={this.setType}>
                                <Option value="find">查找账单</Option>
                                <Option value="query">查询账单</Option>
                            </Select>
                        </Col>
                        <Col span={15}>
                        {
                            this.state.select === 'find' &&
                            <Search placeholder="输入账单名称" onSearch={this.search} enterButton />
                        }
                        {
                            this.state.select === 'query' &&
                            <div>
                                <RangePicker onChange={this.setDate} locale={locale}/>
                                <Button style={{display: 'inline', marginLeft: '5%'}} icon={<AimOutlined />} onClick={this.query}>查询账单</Button>
                            </div>
                        }
                        </Col>
                        <Col span={5}>
                            <Button type='primary' icon={<PlusOutlined />} onClick={this.addBK}>添加账单</Button>
                        </Col>
                    </Row>
                </Col>}
                <Col span={22} className='table-col'>
                    <Table columns={this.state.columns} dataSource={this.state.data}>
                    </Table>
                </Col>
                <Modal title="添加账单信息" visible={this.state.modalVisible} onOk={this.handleOk} style={{width: '95%',margin: 'auto'}} footer={null} onCancel={this.closeBK}>
                    <AddBill addBill={this.onFinish}/>
                </Modal>
                <Modal  visible={this.state.billVisible} title={this.state.image.name}  footer={null}  onCancel={this.handleCancel} >
                    <img alt="billImage" style={{ width: '100%' }} src={this.state.image.path} />
                </Modal>
            </div>
        )
    }
}

export default showBill