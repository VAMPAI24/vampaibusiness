"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface btnProps {
  type: string;
  name?: string;
  text?: string;
  title?: string;
  small?: boolean;
  prefetch?: boolean;
  icon?: IconProp;
  icStyle?: string;
  addOns?: string;
  loading?: boolean;
  disabled?: boolean;
  link?: string;
  click?: () => void;
}

export const Platformbtn: React.FC<btnProps> = (props) => {
  const handleClick = () => {
    props.click?.();
  };

  const btnClass = `bg-main-600 font-jakarta w-full h-[50px] flex items-center justify-center gap-[20px] rounded-[10px] text-white hover:scale-[1] capitalize text-[1em] font-[400] hover:bg-main-800 disabled:bg-main-902 whitespace-nowrap px-[1em] disabled:cursor-not-allowed transition-all duration-300 ease-in-out
 ${props.small && " h-[48px]"}  ${props.addOns} `;

  const _renderbtn = () => {
    switch (props.type) {
      case "normal":
        return (
          <button
            className={btnClass}
            type={"button"}
            onClick={handleClick}
            disabled={props.disabled}
          >
            {props.loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className={`!my-0 animate-spin text-[1.3em] text-white ${props.icStyle}`}
              />
            ) : (
              props.name
            )}{" "}
          </button>
        );
      case "submit":
        return (
          <button className={btnClass} type="submit" disabled={props.disabled}>
            {props.loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className={`!my-0 animate-spin text-[1.3em] text-white`}
              />
            ) : (
              props.name
            )}{" "}
          </button>
        );
      case "secondary":
        return (
          <button
            className={`w-full h-[50px] font-jakarta rounded-[10px] text-main-600 capitalize bg-transparent whitespace-nowrap px-[1em]  border-[2px] border-main-600 text-[1em] hover:rounded-full font-[400] hover:border-2 disabled:cursor-not-allowed ${
              props.small && " h-[48px]"
            } ${props.addOns}`}
            type={"button"}
            onClick={handleClick}
            disabled={props.disabled}
          >
            {props.name}
          </button>
        );
      case "normalLink":
        return (
          <Link
            href={props.link || ""}
            passHref
            prefetch={false}
            className={`bg-main-600 font-jakarta w-full h-[50px] flex items-center justify-center gap-[20px] hover:rounded-full rounded-[10px] text-white capitalize text-[1em] font-[400] hover:bg:main-800 disabled:bg-main-902 disabled:cursor-not-allowed courser-pointer transition-all duration-150 ease-in-out ${
              props.small && " h-[48px]"
            }  ${props.addOns} `}
          >
            {props.loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className={`!my-0 animate-spin text-[1.3em] text-white`}
              />
            ) : (
              props.name
            )}{" "}
          </Link>
        );
      case "link":
        return (
          <Link
            href={props.link || ""}
            passHref
            prefetch={false}
            className={`w-fit font-jakarta cursor-pointer text-main-901 font-[300] text-[1em] capitalize`}
            onClick={handleClick}
          >
            {props.text}{" "}
            <strong className="text-main-600">{props.title}</strong>{" "}
          </Link>
        );
      case "withicon":
        return (
          <button
            className={`w-fit font-jakarta h-fit text-nowrap capitalize text-[1em] font-[300] flex items-center hover:rounded-full  disabled:cursor-not-allowed disabled:hover:none ${props.addOns}`}
            type={"button"}
            onClick={handleClick}
            disabled={props.disabled}
          >
            {props.name}
            <FontAwesomeIcon
              icon={props.icon as IconProp}
              className={`!my-0 text-[1em] ${props.icStyle}`}
            />
          </button>
        );
      case "dynamic":
        return (
          <button
            className={`w-fit font-jakarta justify-center gap-[20px] capitalize text-[1em] font-[500] flex items-center justify-content rounded-[8px]  ${props.addOns}`}
            type={"button"}
            onClick={handleClick}
            disabled={props.disabled}
          >
            {props.loading && (
              <i className="fas fa-spinner animate-spin text-[1.3em] text-white" />
            )}{" "}
            {props.name}{" "}
          </button>
        );
      default:
        return <>Error No Button Type</>;
    }
  };
  return _renderbtn();
};

interface bcProps {
  width?: string;
  name?: string;
  nameTwo: string;
  type?: string;
  loading?: boolean;
  loadingOne?: boolean;
  disabled?: boolean;
  addOns?: string;
  actionOne?: () => void;
  actionTwo: () => void;
}

export const Doublebtns: React.FC<bcProps> = (props) => {
  const handleBack = () => {
    props.actionOne?.();
  };

  const handleContinue = () => {
    props.actionTwo();
  };
  return (
    <div
      className={`${
        props.width ? props.width : "w-full"
      } flex flex-col-reverse lg:flex-row gap-[15px]`}
    >
      {props.actionOne && (
        <Platformbtn
          addOns={props.addOns}
          name={props.name ? props.name : "Go Back"}
          type="secondary"
          click={handleBack}
          disabled={props.loadingOne}
        />
      )}
      <Platformbtn
        addOns={props.addOns}
        name={props.nameTwo}
        type={props.type ? props.type : "normal"}
        click={handleContinue}
        disabled={props.disabled}
        loading={props.loading}
      />
    </div>
  );
};
