import React, { Component } from "react"
import {Form, Input, InputNumber, DatePicker, TimePicker, Button} from 'antd'

class AddBill extends Component{
    constructor(props){
        super(props)
        this.state = {
            content: '',
            price: '',
            date: '',
            time: ''
        }
    }

    setConent = (e) => {
        console.log(e)
        this.setState({
            content: e.target.value
        })
    }

    setPrice = (e) => {
        this.setState({
            price: e
        })
    }

    setDate = (val) => {
        console.log(val, val.format('YYYY-MM-DD'))
        this.setState({
            date: val.format('YYYY-MM-DD')
        })
    }

    setTime = (val) => {
        console.log(val, val.format('h:mm:ss'))
        this.setState({
            date: val.format('h:mm:ss')
        })
    }

    onFinish = () => {
        this.props.onFinish()
    }

    render(){
        return(
            <Form onFinish={this.onFinish}>
                <Form.Item rules={[{
                    required: true,
                    message: '请输入账单内容'
                }]} style={{width: '90%', margin: 'auto', marginBottom: '10px'}}>
                    <Input value={this.state.content} onChange={this.setConent} placeholder='账单内容'/>
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: '请输入账单金额'
                }]} style={{width: '90%', margin: 'auto', marginBottom: '10px'}}>
                    <InputNumber step={0.01} value={this.state.price} onChange={this.setPrice} placeholder='账单金额' style={{width: '100%'}} />
                </Form.Item>
                <Form.Item style={{width: '90%', margin: 'auto', marginBottom: '10px'}}>
                    <DatePicker onChange={this.setDate} placeholder='选择日期' style={{width: '45%', marginRight: '10%'}} />
                    <TimePicker onChange={this.setTime} value={this.state.time} placeholder='选择时间' style={{width: '45%'}} />
                </Form.Item>
                <Form.Item>
                    <Button block type='primary'>添加账单</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default AddBill