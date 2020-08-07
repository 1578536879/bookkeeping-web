import React, {Component} from 'react'
import './showBill.css'
import { Row, Col, Table, Button, Modal, message, Popconfirm} from 'antd'
import { PlusOutlined,QuestionCircleOutlined } from '@ant-design/icons'
import AddBill from '../../component/addBill/addBill'
import commonData from '../../common/DATA'
import {getUserBill, deleteUserBill} from '../../interface/userBill'
import enviornment from '../../common/enviornment'
 
class showBill extends Component{
    constructor(props){
        super(props)
        this.state = {
            columns: commonData.TABLECOLUMS.HOME,
            modalVisible: false,
            data: [],
            image: {
                path: '',
                name: ''
            },
            billVisible: false
        }
        this.onFinish = this.onFinish.bind(this)
    }

    componentDidMount(){
        // eslint-disable-next-line react/no-direct-mutation-state
        console.log(124321)
        this.state.columns.push({
            title: '账单操作',
            dataIndex: 'action',
            render: (action) =>(
                <span>
                    {action.imagePath && <span className='other' onClick={this.picture.bind(this, action.imagePath)}>查看账单图片</span>}
                    &nbsp;&nbsp;
                    <Popconfirm title="确认删除此账单？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}  onConfirm={this.delete.bind(this,action.BID)}>
                        <span className='delete'>删除</span>
                    </Popconfirm>
                    
                </span>
            )
        })
        console.log(localStorage.getItem('group') === 'person')
        let that = this
        if(localStorage.getItem('group') === 'person'){
            getUserBill({
                token: localStorage.getItem('token')
            }).then(res=>{
                console.log(res.data.data.data)
                if(res.data.code === commonData.CODE.SUCCESS){
                    let data = []
                    
                    res.data.data.data.forEach(ele=>{
                        data.push({
                            ...ele,
                            date: new Date(parseInt(ele.date)).toLocaleString(),
                            
                            action: {
                                imagePath: 'http://' + enviornment.hostname + ':' + enviornment.port + '/' + ele.imagePath,
                                BID: ele.BID
                            }
                        })
                    })
                    console.log(data)
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
        deleteUserBill({
            BID: e,
            token: localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success('删除账单成功√')
                let data = that.state.data.filter(ele=>{
                    return ele.BID !== e
                })
                that.setState({
                    data: data
                })
                localStorage.setItem('token', res.data.msg)
            }else{
                message.error(res.data.msg)
            }
        })
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

    onFinish(){
        this.setState({
            modalVisible: false
        })
    }

    render(){
        return (
            <div style={{marginTop: '5%'}}>
                <Col span={22} className='add-col'>
                    <Button type='primary' icon={<PlusOutlined />} onClick={this.addBK}>添加账单</Button>
                </Col>
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