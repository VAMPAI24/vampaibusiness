import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo,faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface alertsProps {
    body:string
    noCenter?:boolean
}

export const AlertError:React.FC<alertsProps> = (props)=> {

    return (
        <span className="w-full mb-[10px] flex items-start gap-[10px] bg-red-100 border-[1px] border-red-200 rounded-[8px] px-[16px] py-[14px]">
            <FontAwesomeIcon
                icon={faCircleInfo}
                className="my-0 text-[1.2em] text-red-800"
            />
            <p className="my-0 font-jakarta text-[1em] font-[300] leading-[1.4em] text-red-900">{props.body}</p>
        </span>
    )
}


export const Tipinfo:React.FC<alertsProps> = (props)=> {
    return (
        <span className={`"ml-[5px] w-fit flex items-center gap-[10px] ${!props.noCenter && 'mx-auto' } `}>
            <FontAwesomeIcon
                icon={faInfoCircle}
                className="my-0 text-[1em] text-main-600 text-center "
            />
            <p className="text-[.8em] font-jakarta font-[300]" >{props.body}</p>
        </span>
    )
}