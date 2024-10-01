import { checkBoxProps } from "@/utils/models/inputsmodel"

export const CheckField:React.FC<checkBoxProps> = (props) => {

    let handleClick = ()=> props.onChange(props.name, !props.check)
    return (
        <label className="w-fit flex items-start gap-[10px]">
            <input className="grid w-[1.3em] h-[1.3em] bg-transparent border-[2px] border-main-300  appearance-none before:w-[0.65em] before:h-[0.65em] before:content-[''] checked:bg-main-600 checked:border-0 "
                type="checkbox"  name={props.name} onChange={handleClick}  checked={props.check}/>
            {props.children}
        </label>
    )
}