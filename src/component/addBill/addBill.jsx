import React, { Component } from "react"
import {Form, Input, InputNumber, DatePicker, Button, Radio, message, Upload} from 'antd'
import {UploadOutlined } from '@ant-design/icons'
import {insertUserBill} from '../../interface/userBill'
import {insertGroupBill} from '../../interface/groupBill'
import commonData from '../../common/DATA'
import {updateBillImage, deleteBillImage} from '../../interface/image'
import enviornment from '../../common/enviornment'


class AddBill extends Component{
    constructor(props){
        super(props)
        this.state = {
            content: '',
            price: '',
            date: '',
            type: false,
            fileList: [],
            props:{
                
            }
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

    setDate = (val, str) => {
        console.log(val, val.format('YYYY-MM-DD'))
        let date = new Date(str)
        date = date.getTime()
        this.setState({
            date: date
        })
    }

    setType = (e) => {
        console.log(e.target.value)
        this.setState({
            type: e.target.value === 'in' ? true : false
        })
    }

    add = () => {
        let that = this 
        if(!this.state.content || !this.state.date || !this.state.price){
            message.warning('请填写账单内容！')
            return
        }
        let path = ''
        if(this.state.fileList[0]){
            path = this.state.fileList[0].path
        }
        console.log(that.state)
        if(localStorage.getItem('group') === 'person'){
            insertUserBill({
                type: that.state.type,
                content: that.state.content,
                date: that.state.date,
                price: that.state.price,
                path: path,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code === commonData.CODE.SUCCESS){
                    message.success('添加账单成功√')
                    localStorage.setItem('token', res.data.data.token)
                }else{
                    message.error(res.data.msg)
                }
                that.props.addBill({
                    type: that.state.type,
                    content: that.state.content,
                    date: that.state.date,
                    price: that.state.price,
                    action: {
                        imagePath: path,
                        BID: res.data.data.data.BID
                    },
                    name: res.data.data.data.name
                })
            })
        }else{
            insertGroupBill({
                type: that.state.type,
                content: that.state.content,
                date: that.state.date,
                price: that.state.price,
                path: path,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code === commonData.CODE.SUCCESS){
                    message.success('添加账单成功√')
                    localStorage.setItem('token', res.data.data.token)
                }else{
                    message.error(res.data.msg)
                }
                that.props.addBill({
                    type: that.state.type,
                    content: that.state.content,
                    date: that.state.date,
                    price: that.state.price,
                    action: {
                        imagePath: path,
                        BID: res.data.data.data.BID
                    },
                    name: res.data.data.data.name
                })
            })
        }
        
    }

    updateBillImage = (file) => {
        let that = this
        let data = new FormData()
        data.append('file', file, file.name)
        updateBillImage({
            token: localStorage.getItem('token'),
            file: data
        }).then(res=>{
            console.log(res)
            if(res.data.code === commonData.CODE.SUCCESS){
                let name = res.data.data.path.indexOf('&&')
                name = res.data.data.path.substr(name+1, res.data.data.path.length)
                that.setState({
                    fileList: [{
                        uid: '1',
                        name: name,
                        status: 'done',
                        url:  'http://' + enviornment.hostname + ':' + enviornment.port + '/' + res.data.data.path,
                        path: res.data.data.path
                      }]
                })
            }else{
                message.error(res.data.msg)
            }
        })
    }

    removaImage = (file) => {
        let that = this
        deleteBillImage({
            token: localStorage.getItem('token'),
            path: that.state.fileList[0].path
        }).then(res=>{
            if(res.data.code === commonData.CODE.SUCCESS){
                message.success('删除成功√')
                that.setState({
                    fileList: []
                })
                localStorage.setItem('token', res.data.data.token)
            }else{
                message.error(res.data.msg)
            }
        })

    }

    handleChange = (file) => {
        let that = this
        if(this.state.fileList.length !== 0){
            this.deleteBillImage(file).bind(this)
            deleteBillImage({
                token: localStorage.getItem('token'),
                path: that.state.fileList[0].path
            }).then(res=>{
                that.updateBillImage(file)
            })
        }else{
            this.updateBillImage(file)
        }
        
        return false
    }

    render(){
        return(
            <Form onFinish={this.add}>
                <Form.Item name='content' rules={[{
                    required: true, 
                    message: '请输入账单内容'
                }]} style={{width: '90%', margin: 'auto', marginBottom: '10px'}}>
                    <Input value={this.state.content} onChange={this.setConent} placeholder='账单内容'/>
                </Form.Item>
                <Form.Item name='price' rules={[{
                    required: true,
                    message: '请输入账单金额'
                }]} style={{width: '90%', margin: 'auto', marginBottom: '10px'}}>
                    <Radio.Group style={{width: '30%'}} defaultValue="out" buttonStyle="solid" onChange={this.setType}>
                        <Radio.Button value="out">支出</Radio.Button>
                        <Radio.Button value="in">收入</Radio.Button>
                    </Radio.Group>
                    <InputNumber step={0.01} min={0.00} value={this.state.price} onChange={this.setPrice} placeholder='账单金额' style={{width: '70%'}} />
                </Form.Item>
                <Form.Item name='date' style={{width: '90%', margin: 'auto', marginBottom: '10px'}} rules={[{
                    required: true,
                    message: '请选择账单日期'
                }]}>
                    <DatePicker showTime onChange={this.setDate} placeholder='选择日期' style={{width: '100%', marginRight: '10%'}} />
                </Form.Item>
                <Form.Item style={{width: '90%', margin: 'auto', marginBottom: '10px'}}>
                    <Upload listType="picture"
                            fileList = {this.state.fileList}
                            beforeUpload = {this.handleChange}
                            onRemove = {this.removaImage}>
                            <span style={{color: '#1890FF', cursor: 'pointer'}}>
                            <UploadOutlined />
                            上传账单图片

                            </span>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button  onClick={this.add} block type='primary'>添加账单</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default AddBill