import React, { Component, createRef } from 'react'
import { Card, Button, Form, Input, DatePicker, message, Spin } from 'antd'
import E from 'wangeditor'
import './editor.less'
import { getArtical, saveArtical } from '../../requests'
import moment from 'moment'

@Form.create()
class Edit extends Component {
    constructor() {
        super()
        this.editorRef = createRef()
        this.state={
            isLoding:false
        }
    }
    handleSubmit = e => {
        this.setState({
            isLoading:true
        })
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const values = {
                ...fieldsValue,
                'createAt': fieldsValue['createAt'].valueOf()
            }
            saveArtical(this.props.match.params.id, values)
            .then(resp => {
                message.success(resp.msg)
                this.props.history.push('/admin/artical')
            })
            .finally(()=>{
                this.setState({
                    isLoading:false
                })
            })
            // console.log('Received values of form: ', values);
        });
    }
    initEditor() {
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html) => {
            // console.log(html)
            this.props.form.setFieldsValue({
                content: html
            })
        }
        this.editor.create()
    }
    componentDidMount() {
        this.initEditor()
        this.setState({
            isLoading:true
        })
        getArtical(this.props.match.params.id).then(reps => {
            const { id, ...data } = reps
            data.createAt = moment(data.createAt)
            this.props.form.setFieldsValue(data)
            this.editor.txt.html(data.content)
        })
        .finally(()=>{
            this.setState({
                isLoading:false
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        }
        const config = {
            rules: [{ type: 'object', required: true, message: 'createAt is required!' }],
        };
        return (
            <div>
                <Card title="编辑文章" bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>} >
                    <Spin spinning={this.state.isLoading}>
                        <Form onSubmit={this.handleSubmit} className="login-form" {...formItemLayout}>
                            <Form.Item label='标题'>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'title is required!' }],
                                })(
                                    <Input
                                        placeholder="Title"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label='作者'>
                                {getFieldDecorator('author', {
                                    rules: [{ required: true, message: 'Author is required!' }],
                                })(
                                    <Input
                                        placeholder="Author"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label='阅读量'>
                                {getFieldDecorator('amount', {
                                    rules: [{ required: true, message: 'amount is required!' }],
                                })(
                                    <Input
                                        placeholder="amount"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label='创造时间'>
                                {getFieldDecorator('createAt', config)(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                                )}
                            </Form.Item>
                            <Form.Item label='内容'>
                                {getFieldDecorator('content', {
                                    rules: [{ required: true, message: 'content is required!' }],
                                })(
                                    <div className='a-editor' ref={this.editorRef}></div>
                                )}
                            </Form.Item>
                            <Form.Item wrapperCol={{
                                xs: { span: 24, offset: 0 },
                                sm: { span: 20, offset: 4 },
                            }}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    保存修改
                            </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Card>
            </div>
        )
    }
}
export default Edit