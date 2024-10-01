import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import React from "react";
import { dateProps } from "@/utils/models/inputsmodel";

export const DateField:React.FC<dateProps>  = (props)=> {
    let handleDate = (date:any )=> {
        props.onChange(props.name, moment(date).format("YYYY-MM"))
    }
    return (
        <span className='w-full h-full z40 z[9999]'>
            <label className='my-0 font-[400] text-[.8em] text-main-900 capitalize'>{props.label}</label>
            <div className={props.height}>
                <DatePicker  
                    value={props.value}
                    onChange={ handleDate }  
                    format="yyyy-MM"
                    disabled={props.disabled}
                    minDate={new Date(props.minDate ?props.minDate :'' )}  
                    maxDetail="year"
                    // minDetail="year"
                />  
            </div>
        </span>
    )
}