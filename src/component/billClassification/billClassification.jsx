import React, {Component} from 'react'
import './billClassification.css'
import echart from 'echarts'
import { Col, DatePicker, Button, Card} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN';


const { RangePicker } = DatePicker;

class billClassification extends Component{
    constructor(props){
        super(props)
        this.state = {
            myChart: '',
            option: {
                title: {
                    text: '账单总结',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['收入', '支出']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['a', 'b', 'c', 'd']
                },
                yAxis: {
                    type: 'value',
                },
                series: [{
                    name: '支出',
                    type: 'line',
                    data: [1,2,3,4],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },{
                    name: '支出',
                    type: 'line',
                    data: [-1, -2,-3,-4],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                        ]
                    }
                }]
            },
            startDate: null,
            endDate: null
        }
    }

    componentDidMount(){
        this.state.myChart = echart.init(document.getElementById('billClassification'))
        this.state.myChart.setOption(this.state.option)
    }

    setDate = (e, str) => {
        console.log(e, str)
        let date = new Date(str[0] + ' 0:0:0')
        this.state.startDate = date.getTime()
        date = new Date(str[1] + ' 0:0:0')
        this.state.endDate = date.getTime()
    }

    render(){
        return (
            <Card bodyStyle={{padding: '5%'}} className='cardContainer' style={{margin: 'auto', marginTop: '2%'}}>
                <Card style={{width: '100%', height: '20%'}}>
                    <RangePicker style={{marginRight: '5%'}} onChange={this.setDate} locale={locale}></RangePicker>
                    <Button className='date' type='primary'>查询账单</Button>
                    <Button type='primary'>查看详细内容</Button>
                </Card>
                
                <Card  bodyStyle={{padding: '5%'}} className='card' style={{margin: 'auto'}}>
                    <div id='billClassification' style={{width: '100%', height: '100%',margin: 'auto'}}></div>                    
                </Card>
            </Card>
        )
    }
}

export default billClassification
