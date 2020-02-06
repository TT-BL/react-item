import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox,Card} from 'antd'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../actions/user'
import './index.less'

const mapState=(state)=>({
  isLogin:state.user.isLogin,
  isLoading:state.user.isLoading,
})
@connect(mapState,{login})
@Form.create()
class Login extends Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.login(values)
          console.log('Received values of form: ', values);
        }
      });
    };
  
    render() {
      // console.log(this.props)
      const { getFieldDecorator } = this.props.form;
      return (
        this.props.isLogin
        ?
        <Redirect to='/admin'></Redirect>
        :
        <Card title='ABC ADMIN登录'  className='a-login'>
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
                })(
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isLoading}>
                Log in
                </Button>
            </Form.Item>
            </Form>
        </Card>
      )
    }
  }
export default Login
