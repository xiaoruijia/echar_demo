import React, {useEffect, useState} from 'react';
import * as echarts from 'echarts';
import './App.css';
import DateSelect from "./component/DateSelect";
import Card from "./component/Card";

let myChart: echarts.ECharts
let myChart2: echarts.ECharts

let cardInfo = [
    {
        icon: <span className="iconfont"
                    style={{color: 'rgb(5,208,231)'}}>&#xe613;</span>,
        count: 0,
        add: 0,
        backgroundColor: 'rgb(232,250,253)',
        title: "点击"
    },
    {
        icon: <span className="iconfont"
                    style={{color: 'rgb(255,172,93)'}}>&#xe68c;</span>,
        count: 0,
        add: 0,
        backgroundColor: 'rgb(255,244,233)',
        title: "打开"
    },
    {
        icon: <span className="iconfont"
                    style={{color: 'rgb(234,84,85)'}}>&#xe74a;</span>,
        count: 0,
        add: 0,
        backgroundColor: 'rgb(253,234,235)',
        title: "安装"
    }
]
let data = {
    'result': [
        ['date', '1/1', '1/2', '1/3', '1/4', '1/5', '1/6', '1/7'],
        ['打开', 200, 300, 400, 500, 600, 700, 800],
        ['点击', 1200, 1800, 2100, 2200, 3882, 5100, 2820],
        ['安装', 100, 230, 200, 230, 30, 50, 70]
    ]
}

function App() {
    const [date, SetDate] = useState<string[]>([])
    const [openD, SetOpenD] = useState<number[]>([])
    const [clickD, SetClickD] = useState<number[]>([])
    const [installD, SetInstallD] = useState<number[]>([])
    const [nameList, SetNameList] = useState<string[]>([])
    const [render, SetRenderData] = useState<string[]>([])
    const [currentDate, SetCurrentDate] = useState<{ open: number, click: number, install: number }>({
        open: 0,
        click: 0,
        install: 0
    })
    let DataTransformObj = (data: { result: (number | string)[][] }) => {
        let name: string[] = []
        for (let i = 0; i < data.result.length; i++) {
            name.push(data.result[i][0].toString())
            switch (data.result[i][0]) {
                case 'date':
                    let [, ...dateList] = data.result[i]
                    SetDate((dateList as string[]))
                    break;
                case '打开':
                    let [, ...openList] = data.result[i]
                    SetOpenD((openList as number[]))
                    break;
                case '安装':
                    let [, ...installList] = data.result[i]
                    SetInstallD((installList as number[]))
                    break;
                case '点击':
                    let [, ...clickList] = data.result[i]
                    SetClickD((clickList as number[]))
                    break;
            }
        }
        SetNameList(name)
    }
    useEffect(() => {
        console.log('页面重新渲染了')
    }, [render])
    useEffect(() => {
        myChart = echarts.init(document.getElementById('main')!);
        myChart2 = echarts.init(document.getElementById('main2')!);
        setTimeout(() => {
            DataTransformObj(data)
        }, 1000)
    }, [])
    useEffect(() => {
        let option = {
            series: [
                {
                    name: 'Funnel',
                    type: 'funnel',
                    label: {
                        position: 'right'
                    },
                    data: [
                        {
                            value: currentDate.click,
                            name: `点击:${clickD[0]}(100%)`
                        },
                        {value: currentDate.open, name: '打开'},
                        {value: currentDate.install, name: '安装'},
                    ]
                },
            ]
        }
        myChart.setOption(option);
    }, [currentDate])
    useEffect(() => {
        let [, ...legendData] = nameList
        let option2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                data: legendData
            },
            xAxis: [
                {
                    type: 'category',
                    data: date,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '安装',
                    interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: '打开/点击',
                    interval: 1000,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '点击',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value: any) {
                            return value;
                        }
                    },
                    data: clickD
                },
                {
                    name: '打开',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value: any) {
                            return value;
                        }
                    },
                    data: openD
                },
                {
                    name: '安装',
                    type: 'bar',
                    yAxisIndex: 0,
                    tooltip: {
                        valueFormatter: function (value: any) {
                            return value;
                        }
                    },
                    data: installD
                }
            ]
        };
        myChart2.on('mouseover', function (params) {
            SetCurrentDate({
                open: openD[params.dataIndex],
                click: clickD[params.dataIndex],
                install: installD[params.dataIndex]
            })
        })
        myChart2.setOption(option2);
    }, [date, openD, clickD, installD, nameList])
    return (
        <div className="App">
            <DateSelect render={SetRenderData}/>
            <div className='card_line'>
                {cardInfo.map((item, index) => <Card key={index} count={item.count} title={item.title} add={item.add}
                                                     icon={item.icon}
                                                     backgroundColor={item.backgroundColor}/>)}
            </div>
            <div className="echarts_box">
                <div className='echarts' id='main'/>
                <div className='echarts' id='main2'/>
            </div>
        </div>
    );
}

export default App;
