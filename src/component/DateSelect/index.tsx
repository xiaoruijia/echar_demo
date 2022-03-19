import React, {useEffect} from 'react';
import {DatePicker} from "antd";
import moment from 'moment';
import './index.css'

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';
type IProp = {
    render: Function
}

function DateSelect(props: IProp) {
    const changeTimer = (date: any) => {
        props.render && props.render(date)
        console.log(date, "===date==")
    }
    return (
        <div className='container'>
            <div className='title'>您可以任意筛选7天时间</div>
            <RangePicker
                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                onChange={(date) => {
                    changeTimer(date)
                }}
                format={dateFormat}
            />
        </div>
    );
}

export default DateSelect;
