import { Drawer } from "antd";
import { ReactNode } from "react";
import { Titlesubtitle } from "./titlesub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";

interface drawerProps {
    closable?:boolean,
    visible:boolean,
    close:()=>void,
    title:string
    subtitle?:string
    children:ReactNode
}

export const Drawerbox:React.FC<drawerProps> = (props)=> {

    return (
        <Drawer
            placement="right"
            size={"large"}
            onClose={props.close}
            open={props.visible}
            closable={false}
        >
            <div className="w-full py-[50px] flex items-center gap-[50px] justify-between">
                <Titlesubtitle title={props.title} addons="w-[50%]" tclass="!text-[1.25em]" subtitle={props.subtitle} sclass="!text-[1em]"  />
                <div className="bg-main-100 w-[40px] h-[40px] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                        icon={ faMultiply } onClick={props.close}
                        className="text-[1.5em] text-red-800 text-center rounded-full"
                    />
                </div>
                
            </div>
            {props.children}
      </Drawer>
    )
}