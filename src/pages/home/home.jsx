import React, {Component} from 'react'
import './home.css'
import {Menu, Dropdown, Row, Col, Avatar,Popover} from 'antd'
import {DownOutlined } from '@ant-design/icons'

class Home extends Component{
    constructor(props){
        super(props)
        // eslint-disable-next-line no-this-before-super
        this.state = {
            userID: '12321342342314',
            groups: '',
            onShow: '个人',
            visible: false,
            content: ''
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

                </Row>
            </div>
        )
    }
}

export default Home

