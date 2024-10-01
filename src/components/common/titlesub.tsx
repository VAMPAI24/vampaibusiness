import React, { ReactNode } from "react";


interface tsubProps {
    step?:string,
    title:string,
    image?:string,
    subtitle?:string,
    addons?:string,
    tclass?:string,
    sclass?:string,
    italic?:string,
    children?:ReactNode
}

export const SmallTitle:React.FC<tsubProps> = (props) => {

    return (
        <div className="flex flex-col items-start gap-[5px] max-w-[80%] ">
            {props.step && <p className="my-0 font-[500] text-[.8em] text-main-800 ">{props.step}</p>}
                <h2 className="my-0 font-[600] text-[1.25em] lg:text-[2.2em] leading-[1.2em] text-main-100">{props.title}</h2>
        </div>
    )
}

export const Titlesubtitle:React.FC<tsubProps> = (props) => {

    return (
        <div className={`flex flex-col items-start gap-[5px] mx-w-[80%] ${props.addons}`}>
            {props.step && <p className="my-0 font-[500] text-[.8em] text-pink-500 ">{props.step}</p>}
                <h2 className={`my-0 font-[600] font-rubik text-[1.5em] lg:text-[2.2em] leading-[1.2em] text-main-902 ${props.tclass}`}>{props.title}</h2>
                {props.subtitle && <p className={`my-0 mt-[5px] font-jakarta font-[300] text-[1em] leading-[1.4em] text-main-901 ${props.sclass} `}> {props.subtitle} <br/><strong className="font-[00] italic ">{props.italic}</strong></p>}
                {props.children && props.children}
            {/*  */}
        </div>
    )
}

// form title

export const Littletitle:React.FC<tsubProps> = (props)=> {
    return   <h2 className="my-0 font-[400] font-rubik text-[1em] lg:text-[1.2em] leading-[1.2em] text-main-100">{props.title}</h2>
}