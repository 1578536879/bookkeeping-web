import React, {Component} from 'react'
import './home.css'
import {Menu, Dropdown, Row, Col, Avatar,Popover, Table, Button} from 'antd'
import {DownOutlined, PlusOutlined } from '@ant-design/icons'
// import Column from 'antd/lib/table/Column'

class Home extends Component{
    constructor(props){
        super(props)
        // eslint-disable-next-line no-this-before-super
        this.state = {
            userID: '12321342342314',
            groups: '',
            onShow: '个人',
            visible: false,
            content: '',
            columns: [{
                title: '账单内容',
                dataIndex: 'content'
            },{
                title: '账单金额',
                dataIndex: 'price'
            },{
                title: '账单日期',
                dataIndex: 'date'
            },{
                title: '账单记录人',
                dataIndex: 'name'
            },{
                title: '账单操作',
                dataIndex: 'other',
                render: (content) =>(
                    <span className='group-col'>
                        <a onClick={this.picture.bind(this, content)}>{content.picture}</a>&nbsp;&nbsp;
                        <a onClick={this.delete.bind(this, content)}>删除</a>
                    </span>
                )
            }],
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
            }]
        }
    }

    componentDidMount(){
        console.log(1232)
        let data = ['个人', 'test', 'test1'];
        // eslint-disable-next-line react/no-direct-mutation-state
        let buffer = []
        data.forEach(ele=>{
            // eslint-disable-next-line react/react-in-jsx-scope
            buffer.push(<Menu.Item key={ele}>{ele}</Menu.Item>)
            console.log(buffer)
        })
        this.setState({
            groups: (<Menu onClick={this.handleMenuClick} className='menu'>
                        {buffer}
                    </Menu>),
            content: (
                <div>
                    <p className='choose'>修改密码</p>
                    <p className='choose'>退出登录</p>
                </div>
            )
        })
    }

    handleMenuClick(e){
        console.log(e)
        this.setState({
            onShow: e.key
        })
    }

    hide = () => {
        this.setState({
          visible: false,
        });
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

    render(){
        console.log(this.state.groups)
        return (
            <div>
                <Row className='header'>
                    <Col span={12} className='groups-col'>
                        <Dropdown overlay={this.state.groups} trigger={['click']}>
                            <span>{this.state.onShow}&nbsp;&nbsp;&nbsp;<DownOutlined className='group-col'/></span>
                        </Dropdown>
                    </Col>
                    <Col span={12} className='avater-col'>
                        <Popover content={<a onClick={this.hide}>Close</a>} trigger="click" visible={this.state.visible} onVisibleChange={this.handleVisibleChange} content={this.state.content}>
                            <Avatar className='avater' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">U</Avatar>
                        </Popover>
                    </Col>
                </Row>
                <Row>
                    <Col span={22} className='add-col'>
                        <Button type='primary' icon={<PlusOutlined />}>添加账单</Button>
                    </Col>
                    <Col span={22} className='table-col'>
                        <Table columns={this.state.columns} dataSource={this.state.data}>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home

