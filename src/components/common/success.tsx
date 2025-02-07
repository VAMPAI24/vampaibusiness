import { ReactNode } from "react";
import { Platformbtn } from "./buttons";
import Image from "next/image";
import success from "@/public/svgs/success1.svg";

interface successProps {
  title: string;
  subtitle?: string;
  btnName?: string;
  btnTwoName?: string;
  // image?: StaticImageData;
  image?: string;
  click?: () => void;
  clickTwo?: () => void;
  children?: ReactNode;
}

export const Success: React.FC<successProps> = (props) => {
  const { btnTwoName, clickTwo } = props;
  return (
    <div className="flex w-full max-w-[80%] md:max-w-[450px] mx-auto">
      <div className="flex flex-col items-center gap-[2em]  py-[50px]">
        <Image
          src={props.image ? props.image : success}
          className="w-[100px] md:w-auto"
          alt="success"
        />
        <span className="flex flex-col gap-[5px] items-center text-center">
          <p className="my-0 font-rubik font-[400] text-main-902 leading-[1.2em] text-[1.25em]">
            {props.title}
          </p>
          <p className="font-jakarta font-[300] text-main-901 leading-[1.5em] text-[1em]">
            {props.subtitle}
          </p>
        </span>
        <div className="w-full mx-auto flex flex-col md:flex-row justify-center gap-[.5em] mt-[20px]">
          {clickTwo && (
            <Platformbtn
              type="secondary"
              name={btnTwoName}
              click={clickTwo}
              addOns="!w-full md:!w-fit md:!px-[1.5em]"
            />
          )}
          {props.click && (
            <Platformbtn
              type="normal"
              name={props.btnName}
              click={props.click}
              addOns="!w-full md:!w-fit md:!px-[1.5em]"
            />
          )}
        </div>
      </div>
    </div>
  );
};
