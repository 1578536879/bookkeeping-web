import React, {Component} from 'react';
import Login from '../../component/login/login'
import Register from '../../component/register/register'
import './App.css';
import '../../common/style.css'
import {Menu} from 'antd'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      current: 'login'
    }
    this.registerSuccess = this.registerSuccess.bind(this)
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (e) => {
    console.log(e)
    this.setState({
      current: e.key
    })
  }

  forgetPassword = () =>{
    this.props.history.push({
      pathname: '/forget-password',
    })
  }

  registerSuccess(){
    this.setState({
      current: 'login'
    })
  }

  render(){
    return (
      <div className="App">
        <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal">
          <Menu.Item key="login">
            登录
          </Menu.Item>
          <Menu.Item key="register">
            注册
          </Menu.Item>
        </Menu>
        {this.state.current === "login"?<Login forgetPassword={this.forgetPassword}></Login>:<Register registerSuccess={this.registerSuccess}></Register>}
        
      </div>
    );
  }
  
}

export default App;
