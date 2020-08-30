import React, {Component} from 'react'
import './billClassification.css'
import echart from 'echarts'
import { Select, DatePicker, Button, Card, message} from 'antd'
import {groupBillStatistics} from '../../interface/groupBill'
import {userBillStatistics} from '../../interface/userBill'
import commonData from '../../common/DATA'
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment'
const Option = Select
moment.locale('en', {
    week: {
      dow: 1,
    },
  });


class billClassification extends Component{
    constructor(props){
        super(props)
        this.state = {
            myChart: '',
            datePicker: 'week',
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
                    data: [],
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
                    name: '收入',
                    type: 'line',
                    data: [],
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
            endDate: null,
            xAxis: ''
        }
        this.selectChange = this.selectChange.bind(this)
        this.statistics = this.statistics.bind(this)
    }

    componentDidMount(){
        this.state.myChart = echart.init(document.getElementById('billClassification'))
        this.state.myChart.setOption(this.state.option)
    }



    getWeekDate(theyear,weekcount){
        let year = theyear;
        let week = weekcount;
        if(year === "" || week === "") return;

        let d = new Date(year, 0, 1);
        d.setDate(parseInt("1065432".charAt(d.getDay())) + week * 7);
        let w = d.getDay(), n = 24*60*60*1000;
        let first = new Date(d.getTime() - parseInt("6012345".charAt(w))*n);
        // let end = new Date(d.getTime() + parseInt("0654321".charAt(w))*n);
        return first.format("MM月dd日")
    }

    setDate = (e, str) => {
        console.log(e, str)
        let timeArr = []
        let weekEng = ['Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday','Sunday']
        let xAxis = []
        if(this.state.datePicker === 'week'){
            let year = parseInt(str)
            let index = str.indexOf('-')
            let week = str.slice(index+1, str.length)
            week = parseInt(week)
            weekEng.forEach(ele=>{
                let day = moment().day(ele).year(year).week(week).toDate()
                let date = new Date(`${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`)
                xAxis.push(`${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`)
                timeArr.push(date.getTime())
            })
            let lastDay = new Date(timeArr[timeArr.length-1])
            lastDay = lastDay.setDate(lastDay.getDate()+1)
            timeArr.push(lastDay)
        }else if(this.state.datePicker === 'month'){
            let year = parseInt(str)
            let index = str.indexOf('-')
            let mouth = str.slice(index+1, str.length)
            mouth = parseInt(mouth)
            let num = 1
            let day = new Date(`${year}-${mouth}-${num}`)
            timeArr.push(day.getTime())
            xAxis.push(new Date(`${year}-${mouth}-${num}`))
            let week = moment(day.getTime()).day()
            if(week%7 !== 1){
                num += (7 - week + 1)
            }else{
                num += 7
            }
            let lastday = new Date(day.setDate(0))
            lastday = lastday.getDate()
            for(let i=0;i<parseInt(lastday/7);i++){
                day = new Date(`${year}-${mouth}-${num}`)
                timeArr.push(day.getTime())
                xAxis.push(new Date(`${year}-${mouth}-${num}`))
                num += 7
            }
            console.log(lastday)
            day = new Date(`${year}-${mouth}-${lastday}`)
            day = day.setDate(day.getDate()+1)
            timeArr.push(day)
        }else if(this.state.datePicker === 'year'){
            let year = parseInt(str)
            for(let i=0;i<12;i++){
                let date = new Date(`${year}-${i+1}`)
                timeArr.push(date.getTime())
                xAxis.push(`${year}-${i+1}`)
            }
            let lastDay = new Date(`${year+1}-1`)
            timeArr.push(lastDay.getTime())
        }
        this.setState({
            timeArr: timeArr,
            xAxis: xAxis
        })
    }

    selectChange(e){
        console.log(e,
            <DatePicker style={{marginRight: '5%'}} onChange={this.setDate} picker={e} locale={locale}/>)
        this.setState({
            datePicker: e
        })
    }

    statistics(){
        let that = this
        if(localStorage.getItem('group') === 'person'){
            userBillStatistics({
                data: that.state.timeArr,
                datePicker: that.state.datePicker,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code !== commonData.CODE.SUCCESS){
                    message.error(res.data.msg)
                }else{
                    that.state.myChart.setOption({
                        xAxis: {
                            data: that.state.xAxis
                        },
                        series: [{
                            name: '收入',
                            data: res.data.data.in
                        },{
                            name: '支出',
                            data: res.data.data.out
                        }]
                    })
                }
            })
        }else{
            groupBillStatistics({
                data: that.state.timeArr,
                datePicker: that.state.datePicker,
                token: localStorage.getItem('token')
            }).then(res=>{
                if(res.data.code !== commonData.CODE.SUCCESS){
                    message.error(res.data.msg)
                }else{
                    that.state.myChart.setOption({
                        xAxis: {
                            data: that.state.xAxis
                        },
                        series: [{
                            name: '收入',
                            data: res.data.data.in
                        },{
                            name: '支出',
                            data: res.data.data.out
                        }]
                    })
                }
            })
        }
    }

    render(){
        return (
            <Card bodyStyle={{padding: '5%'}} className='cardContainer' style={{margin: 'auto', marginTop: '2%'}}>
                <Card style={{paddingLeft: '15%'}} className='selectCard'>
                    <Select defaultValue='周统计' style={{ width: 80, marginRight: '5%'}} onChange={this.selectChange}>
                        <Option value="week">周统计</Option>
                        <Option value="month">月统计</Option>
                        <Option value="year">年统计</Option>
                    </Select>
                    <DatePicker inputReadOnly={true} style={{marginRight: '5%'}} onChange={this.setDate} picker={this.state.datePicker} locale={locale}/>
                    <Button className='date' type='primary' onClick={this.statistics}>查询账单</Button>
                </Card>
                
                <Card  bodyStyle={{padding: '5%'}} className='card' style={{margin: 'auto'}}>
                    <div id='billClassification' style={{width: '100%', height: '100%',margin: 'auto'}}></div>  
                </Card>
            </Card>
        )
    }
}

export default billClassification
