import React, {useEffect} from 'react';
import './index.css'

type IProp = {
    icon: JSX.Element,
    count: number,
    title: string,
    add: number,
    backgroundColor: string,
}

function DateSelect(props: IProp) {
    return (
        <div className='single_card'>
            <div className='single_card_left' style={{background: props.backgroundColor}}>{props.icon}</div>
            <div className='single_card_right'>
                <div className='single_card_right_up'>{props.count}<span
                    className="iconfont">&#xe632;</span><span>{props.add}</span>
                </div>
                <div className='single_card_right_down'>{props.title}</div>
            </div>
        </div>
    );
}

export default DateSelect;
