import React, { Component } from 'react'
import { Card, Button,Table,Tag} from 'antd'
import moment from 'moment'
import {getArticles} from '../../requests'

const columnTitle={
    id:'id',
    title:'标题',
    author:'作者',
    amount:'阅读量',
    creatAt:'发布时间'
}

export default class ArticalList extends Component {
    constructor(){
        super()
        this.state={
            dataSource:[],
            columns:[],
            total:0,
            isLoading:false
        }
    }
    CreateColumn(columnKeys){
        let columns=[]
        columns= columnKeys.map((item)=>{
            if(item==='amount'){
                return {
                    title:columnTitle[item] ,
                    dataIndex: item,
                    key: item,
                    render:(text, record, index)=>{
                        const {amount}=record
                        return  <Tag color={amount>280?'#f50':'#2db7f5'}>{amount}</Tag>
                    }
                }
            }
            if(item==='creatAt'){
                return {
                    title:columnTitle[item] ,
                    dataIndex: item,
                    key: item,
                    render:(text, record, index)=>{
                        const {creatAt}=record
                        return moment(creatAt).format('YYYY年mm月dd日 HH:mm:ss')
                    }
                }
            }
            return {
                title:columnTitle[item] ,
                dataIndex: item,
                key: item,
            }
           
        })
        columns.push({
            title:'操作',
            key: 5,
            render:()=>{
                return (
                    <>
                        <Button size='small' type='primary'>编辑</Button>
                        <Button size='small' type='danger'>删除</Button>
                    </>
                )
            }
        })
        return columns
    }
    getData(){
        this.setState({
            isLoading:true
        })
        getArticles().then(resp=>{
            const columnKeys=Object.keys(resp.list[0])
            const columns=this.CreateColumn(columnKeys)
            this.setState({
                total:resp.total,
                columns,
                dataSource:resp.list,
                isLoading:false
            })
        })
        .catch(err=>{

        })
        .finally(
            ()=>{
                this.setState({
                    isLoading:false
                })
            }
        )
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <div>
                <Card title="文章列表" bordered={false} extra={<Button>编辑列表</Button>} >
                    <Table dataSource={this.state.dataSource}
                    rowKey={record=>record.id}
                     columns={this.state.columns}
                     loading={this.state.isLoading}
                     pagination ={{
                        total:this.state.total,
                        hideOnSiglePage:true
                     }} />
               </Card>
            </div>
        )
    }
}
