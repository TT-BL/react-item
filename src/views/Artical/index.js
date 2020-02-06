import React, { Component } from 'react'
import { Card, Button,Table,Tag,Modal,message} from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'
import {getArticles,deleteArtical} from '../../requests'

const columnTitle={
    id:'id',
    title:'标题',
    author:'作者',
    amount:'阅读量',
    createAt:'发布时间'
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
            if(item==='createAt'){
                return {
                    title:columnTitle[item] ,
                    dataIndex: item,
                    key: item,
                    render:(text, record, index)=>{
                        const {createAt}=record
                        return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
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
            render:(text, record, index)=>{
                return (
                    <>
                        <Button size='small' type='primary' onClick={this.toEdit.bind(this,record.id)}>编辑</Button>
                        <Button size='small' type='danger' onClick={this.deleted.bind(this,record)}>删除</Button>
                    </>
                )
            }
        })
        return columns
    }
    toEdit=(id)=>{
        this.props.history.push(`/admin/artical/edit/${id}`)
    }
    deleted=(record)=>{
        const that=this
        return(
            Modal.confirm({
                title: '该操作不可逆，请谨慎操作!!!',
                content:<span>确定删除<span style={{color:'red'}}>{record.title}</span></span>, 
                onOk() {
                    // return new Promise((resolve, reject) => {
                    //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    // }).catch(() => console.log('Oops errors!'));
                    return deleteArtical(record.id).then(resp=>{
                        message.success(resp.msg)
                        that.getData()
                    })
                  },
                  onCancel() {},
              })
        )
    }
    setData(state){
        if(this.updater.isMounted(this)) return
        this.setSate(state)
    }
    getData(){
        this.setState({
            isLoading:true
        })
        // console.log(this)
        getArticles().then(resp=>{
            const columnKeys=Object.keys(resp.list[0])
            const columns=this.CreateColumn(columnKeys)
            this.setData({
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
                this.setData({
                    isLoading:false
                })
            }
        )
    }
    onPageChange=(page, pageSize)=>{
        this.setState({
            offset:(page-1)*pageSize,
            limit:pageSize
        },()=>{
            this.getData()
        })
    }
    onShowSizeChange=(current, size)=>{
        this.setState({
            offset:0,
            limit:size
        },()=>{
            this.getData()
        })
    }

    exportFile(){
        let data=[Object.keys(this.state.dataSource[0])]
        for(let i=0;i<this.state.dataSource.length;i++){
            data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].createAt).format('YYYY-MM-DD HH:mm:ss'),
            ])
        }
        console.log(Object.keys(this.state.dataSource[0]))
        console.log(Object.values(this.state.dataSource[0]))
        const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <div>
                <Card title="文章列表" bordered={false} extra={<Button onClick={this.exportFile.bind(this)}>导出Excel</Button>} >
                    <Table dataSource={this.state.dataSource}
                    rowKey={record=>record.id}
                     columns={this.state.columns}
                     loading={this.state.isLoading}
                     pagination ={{
                        current:this.state.offset/this.state.limit+1,
                        total:this.state.total,
                        hideOnSiglePage:true,
                        onChange:this.onPageChange,
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onShowSizeChange:this.onShowSizeChange
                     }} />
               </Card>
            </div>
        )
    }
}
