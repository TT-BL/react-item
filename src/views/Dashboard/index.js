import React, { Component,createRef} from 'react'
import { Card, Row, Col } from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import {getArticalAmount} from '../../requests'

export default class Dashboard extends Component {
    constructor(){
        super()
        this.articalAmount=createRef()
    }
    articalInit(){
        const myChart = echarts.init(this.articalAmount.current);
        getArticalAmount().then(reps=>{
            myChart.setOption( {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: reps.amount.map(item=>item.month)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: reps.amount.map(item=>item.value),
                    type: 'line',
                    areaStyle: {}
                }]
            });
        })
    }
    componentDidMount(){
        this.articalInit()
    }
    render() {
        return (
            <>
                <Card title="概览" bordered={false}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="a-gutter-box" style={{background:'#AB47BC'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="a-gutter-box"  style={{background:'#FFEB3B'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="a-gutter-box"  style={{background:'#FF5722'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="a-gutter-box"  style={{background:'#43A047'}}>col-6</div>
                        </Col>
                    </Row>
                </Card>
                <Card title="最近浏览量" bordered={false}>
                    <div ref={this.articalAmount} style={{height:'400px'}}></div>
                </Card>
            </>
        )
    }
}
