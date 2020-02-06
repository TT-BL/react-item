import React, { Component } from 'react'

import { Layout, Menu, Dropdown, Icon, Avatar, Badge } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {ReceiveNotifications} from '../../actions/notification'
import {logout} from '../../actions/user'

import logo from './logo.png'
import './index.less'
const { Header, Content, Sider } = Layout;

const mapState = (item => {
    return { 
        notificationAmount:item.notifications.list.filter(item=>item.hasRead!==true).length,
        avater:item.user.avater,
        displayName:item.user.displayName
     }
})
@connect(mapState,{ReceiveNotifications,logout})
@withRouter
class Frame extends Component {
    onMenuClick = ({ key }) => {
        // console.log(key)
        // console.log(this.props)
        this.props.history.push(key)
    }
    onItemClick = ({ key }) => {
        if(key==='/logout')
        {
            this.props.logout()
        }
        else{
            this.props.history.push(key)
        }
    }
    componentDidMount(){
        this.props.ReceiveNotifications()
    }
    menu =()=> {
        return(
            <Menu onClick={this.onItemClick}>
            <Menu.Item key="/admin/notifications">
                <Badge dot={Boolean(this.props.notificationAmount)}>通知中心</Badge>
            </Menu.Item>
            <Menu.Item key="/admin/setting">
                个人设置
          </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="/logout">退出登录</Menu.Item>
        </Menu>
        )
        
    }
    render() {
        return (
            <Layout>
                <Header className="header a-header">
                    <div className="logo a-logo" >
                        <img src={logo} alt='' />
                    </div>
                    <div className='a-message' >
                        <Dropdown overlay={this.menu} trigger={['click']}>
                            <Badge count={this.props.notificationAmount}>
                                <Avatar src={this.props.avater} />欢迎您! {this.props.displayName}
                                <Icon type="down" />
                            </Badge>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            selectedKeys={this.props.location.pathname}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.onMenuClick}
                        >
                            {this.props.route.map(route => {
                                return (<Menu.Item
                                    key={route.pathname}>
                                    <Icon type={route.icon} />
                                    {route.title}
                                </Menu.Item>)
                            })}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '16px' }}>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default Frame