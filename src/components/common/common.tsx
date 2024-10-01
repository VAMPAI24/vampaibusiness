import React, { ReactNode } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Titlesubtitle } from "./titlesub";
import { dropBoxModel, stepModel } from "@/utils/models/models";
import {
  certModel,
  cvMultiEntries,
  cvSectionProps,
  eduModel,
  langModel,
  refModel,
} from "@/utils/models/cvmodel";
import { Platformbtn } from "./buttons";
import { faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";

interface boxProps {
  addons?: string;
  children: ReactNode;
}

export const Boxrow: React.FC<boxProps> = (props) => {
  return (
    <span
      className={`w-full flex flex-col lg:flex-row items-start ${
        props.addons ? props.addons : "gap-[20px] lg:gap-[10px]"
      } `}
    >
      {props.children}
    </span>
  );
};

export const Boxcol: React.FC<boxProps> = (props) => {
  return (
    <span
      className={`w-full flex flex-col items-start ${
        props.addons ? props.addons : "gap-[20px] lg:gap-[10px]"
      } `}
    >
      {props.children}
    </span>
  );
};

export const Formcontainer: React.FC<boxProps> = (props) => {
  return (
    <div className="w-full flex flex-col gap-[20px]">{props.children}</div>
  );
};

// singlestep
interface stepProps {
  active: number;
  data: stepModel;
  click: (value: number) => void;
}
export const Singlestep: React.FC<stepProps> = (props) => {
  let handleClick = () => props.click(props.data.value);
  return (
    <span
      onClick={handleClick}
      className="w-fit flex xl:flex-row flex-col items-start gap-[25px] cursor-pointer"
    >
      <p
        className={`my-0 w-[50px] h-[50px] text-center flex items-center justify-center text-[1.5em] rounded-[5px] ${
          props.active >= props.data.value
            ? "bg-main-600 text-white"
            : "bg-main-200 text-main-901"
        }`}
      >
        {props.data.value}
      </p>
      <Titlesubtitle
        title={props.data.title}
        addons="!gap-[0px]"
        tclass="!text-[1.2em] capitalize"
        subtitle={props.data.subtitle}
        sclass="!text-[.9em]"
      />
    </span>
  );
};

// drop box

interface dbProps {
  data: dropBoxModel[];
  addOns?: string;
}

export const Dropbox: React.FC<dbProps> = (props) => {
  return (
    <div
      className={`w-fit pr-[1em]  md:w-[12em] 2xl:w-[15em]  py-[10px] shadow-shadow-one bg-white border-[1px] border-main-200 flex flex-col gap-[10px] rounded-[6px] text-main-901 absolute bottom-[-10px] right-[10px] ${props.addOns}`}
    >
      {props.data.map((item, id) => (
        <span
          key={id.toString()}
          onClick={item.click}
          className="w-full cursor-pointer pl-[16px] py-[5px] text-main-901 flex items-center gap-[16px]"
        >
          {/* {item.icon && (
            <FontAwesomeIcon icon={item.icon} className="my-0 text-[.8em]" />
          )} */}
          <p className="my-0 font-jakarta font-[300] text-[.75em] capitalize">
            {item.name}
          </p>
        </span>
      ))}
    </div>
  );
};

// add and remove from form

interface addProps extends cvSectionProps {
  data: certModel[] | eduModel[] | langModel[] | refModel[];
  structure: cvMultiEntries;
  name: string;
}

export const AddAndRemove: React.FC<addProps> = (props) => {
  let addData = () => props.addData(props.name, props.structure);

  let removeData = () => props.removeData(props.name);
  return (
    <Boxcol addons="w-full items-end gap-[20px] mt-[.5em]">
      <span className="w-fit  flex items-start gap-[20px]">
        {/* name={`Remove ${props.name.replace("_", " ")}`} */}
        {props.data.length > 1 && (
          <Platformbtn
            type="withicon"
            icon={faSubtract}
            addOns="text-red-800 !gap-[10px]  !flex-row-reverse "
            name={`Remove Item`}
            click={removeData}
          />
        )}
        {
          <Platformbtn
            type="withicon"
            icon={faAdd}
            addOns="text-main-800 !gap-[10px] !flex-row-reverse "
            name={`Add Item`}
            click={addData}
          />
        }
      </span>
    </Boxcol>
  );
};

// copy to clipboard
interface clipProps {
  body: string;
}
export const CopyBox: React.FC<clipProps> = (props) => {
  const [copied, setCopied] = React.useState(false);

  const board = React.useRef(null);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(props.body);
    setCopied(true);
  };

  return (
    <span
      className="w-full bg-main-100 border-[1px] border-main-600 rounded-[5px] px-[20px] py-[15px] flex items-center justify-between gap-[10px]"
      ref={board}
      onClick={copyCodeToClipboard}
    >
      <p className="my-0 text-[.9em] lg:text-[1em] font-[300] text-main-900 capitalize ">
        {props.body}
      </p>
      <p className="my-0 text-[.9em] lg:text-[1em] font-[300] text-main-600 capitalize">
        {copied ? " Copied!" : "Tap to copy"}
      </p>
    </span>
  );
};
