import React, { Component } from 'react'

import { Layout, Menu,Icon } from 'antd'; 
import {withRouter} from 'react-router-dom'
import logo from './logo.png'
import './index.less'
const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {
    onMenuClick=({key})=>{
        this.props.history.push(key)
        console.log(this.props)
    }
    render() {
        return (
            <Layout>
                <Header className="header a-header">
                    <div className="logo a-logo" >
                        <img src={logo} alt=''/>
                     </div>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            selectedKeys={this.props.location.pathname}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.onMenuClick}
                           >
                               { this.props.route.map(route=>{
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