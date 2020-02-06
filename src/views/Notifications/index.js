import React, { Component } from 'react'
import { Card, Button, List,Badge,Spin} from 'antd'
import {connect} from 'react-redux'

import {MarkNotificationAsReadById,MarkAllNotificationAsRead} from '../../actions/notification'

const mapState=(item=>{
  const {list,isLoading}=item.notifications
  return {list,isLoading}
})
@connect(mapState,{MarkNotificationAsReadById,MarkAllNotificationAsRead})
class Notifications extends Component {
    render() {
      // console.log(this.props)
    //   console.log(this.props.isLoading)
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="通知中心" bordered={false} extra={<Button disabled={this.props.list.every(item=>item.hasRead===true)} onClick={this.props.MarkAllNotificationAsRead}>全部标记为已读</Button>} >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                            <List.Item   actions={item.hasRead?null:[<Button onClick={this.props.MarkNotificationAsReadById.bind(this,item.id)}>标记为已读</Button>]}>
                                <List.Item.Meta
                                    title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                    description={item.desc}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        )
    }
} 
export default Notifications
