import React, {Component} from 'react'
import './showBill.css'
import { Row, Col, Table, Button, Modal, message} from 'antd'
import { PlusOutlined,} from '@ant-design/icons'
import AddBill from '../../component/addBill/addBill'
import commonData from '../../common/DATA'

class showBill extends Component{
    constructor(props){
        super(props)
        this.state = {
            columns: commonData.TABLECOLUMS.HOME,
            modalVisible: false,
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
        }
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

    render(){
        return (
            <div>
                <Col span={22} className='add-col'>
                    <Button type='primary' icon={<PlusOutlined />} onClick={this.addBK}>添加账单</Button>
                </Col>
                <Col span={22} className='table-col'>
                    <Table columns={this.state.columns} dataSource={this.state.data}>
                    </Table>
                </Col>
                <Modal title="添加账单信息" visible={this.state.modalVisible} onOk={this.handleOk} style={{width: '95%',margin: 'auto'}} footer={null} onCancel={this.closeBK}>
                    <AddBill onFinish={this.onFinish}/>
                </Modal>
            </div>
        )
    }
}

export default showBill