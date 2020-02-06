import React, { Component } from 'react'
import { Upload, Card, Spin } from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'

import {changeAvatar} from '../../actions/user'
import './index.less'

const mapState=(state)=>({
    avatar:state.user.avater
})
@connect(mapState,{changeAvatar})
class Profile extends Component {
    state = {
        isLoading: false,
        avatar: ''
    }
    handleUploadAvatar=({ file })=>{
        // console.log(file)
        const data=new FormData()
        data.append('Token','f98d73a28c84f5feeecd12fffde8c8dcb968ad6f:024I0WUbtiNoBtRiF5OBJpenT_I=:eyJkZWFkbGluZSI6MTU4MDk3OTg1OCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA4OTM0IiwiYWlkIjoiMTY2MjQxOCIsImZyb20iOiJmaWxlIn0=')
        data.append('file',file)
        this.setState({
            isLoading: true
        })
        axios.post('http://up.imgapi.com',data).then(resp=>{
            if(resp.status===200){
                this.setState({
                    isLoading: false,
                })
                this.props.changeAvatar(resp.data.linkurl)
            }
            else{}
        })
        .catch()
    }
    render() {
        return (
            <Card
                title='个人设置'
                bordered={false}
            >
                <Upload
                    showUploadList={false}
                    customRequest={this.handleUploadAvatar}
                >
                    <Spin spinning={this.state.isLoading}>
                        {this.props.avatar ? <img src={this.props.avatar} alt='头像'></img> : <span>点击上传</span>}
                    </Spin>
                </Upload>
            </Card >
        )
    }
}
export default Profile