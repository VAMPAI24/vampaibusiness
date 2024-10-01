import React from "react";
import { uploadProps } from "@/utils/models/inputsmodel";
import { Titlesubtitle } from "./titlesub";

export const Upload:React.FC<uploadProps> = (props) => {

    const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        validateSelectedFile(e)
    };

    const validateSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB
        const selectedFile = e.target.files && e.target.files[0];
    
        if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
            alert('File must be less than 1GB');
        } else if (selectedFile) {
            props.onChange(props.name, selectedFile);
        }
    };


    const remove = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        props.onChange(props.name)
    }
    if(props.type) {
        return (
            <div className="w-full flex flex-col gap-[10px]">
                <div className={` w-full`}>
                    {!props.value ? <>
                        <input type="file" id={props.id} value={props.value} name = {props.name} accept=".jpg, .jpeg, .png, .pdf" onChange={handleUpload}  hidden/>
                        <span className="mx-auto w-[250px] flex flex-col md:flex-row items-center gap-[10px] justify-center">
                            <label className="w-fit px-[15px] py-[5px] h-[46px] rounded-[5px] text-main-901 capitalize border-main-600 text-[.8em] font-[500] hover:bg-main-800 whitespace-nowrap flex items-center gap-[5px]" htmlFor={props.id}> <i className="fas fa-plus-circle text-[1em]" /> upload image </label>
                        </span>
                    </>: <span className="mx-auto w-[250px] flex flex-col md:flex-row items-center gap-[10px] justify-center">
                            <label className="w-fit px-[15px] py-[5px] h-[46px] rounded-[5px] text-main-901 capitalize border-main-600 text-[.8em] font-[500] hover:bg-main-800 whitespace-nowrap flex items-center gap-[5px]" htmlFor={props.id}> <i className="fas fa-plus-circle text-[1em]" /> upload image </label>
                        </span>}
                </div>
    
            </div>
        )
    } else {
        return (
            <div className="w-full flex flex-col gap-[10px]">
                <Titlesubtitle title={props.title} tclass="!text-[1em] !font-[500]" />
                <div className={` w-full rounded-[5px] py-[20px] bg-main-100 border-main-800 border-[1px] border-dashed px-[30px] py-30px`}>
                        {!props.value ? <> 
                        <input type="file" id={props.id} value={props.value} name = {props.name} accept=".pdf" onChange={handleUpload}  hidden/>
                            <span className="mx-auto w-full md:w-[250px] flex flex-col md:flex-row items-center gap-[10px] justify-center">
                                <label className="w-fit px-[15px] py-[5px] h-[46px] rounded-[5px] text-white capitalize bg-main-600 text-[.8em] font-[500] hover:bg-main-800 whitespace-nowrap flex items-center gap-[5px]" htmlFor={props.id}>Attach Document </label>
                                <p className="my-0 text-[.9em] text-center text-main-902 font-[300] !text-nowrap !whitespace-nowrap"> PDF - not more than  <strong className="text-nowrap whitespace-nowrap"> 1MB  </strong></p>
                            </span> 
                            
                        </>
                        : <button className="w-fit mx-auto px-[15px] py-[10px] h-[46px] rounded-[5px] text-white capitalize bg-red-600 text-[.8em] font-[500] hover:bg-red-800 flex items-center gap-[5px]" onClick={remove}> 
                                <i className="fas fa-minus-circle text-[1em] "/> remove 
                                - {props.value.name}
                            </button>
                    }
    
                </div>
    
            </div>
        )
    }
   
}