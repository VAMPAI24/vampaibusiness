import React from "react";

const HeaderBox = ({ title, description, variant }: HeaderBoxProps) => {
  return (
    <div className={`${variant}`}>
      <h1 className="font-rubik font-bold text-5xl text-sec-901 mb-4">{title}</h1>
      <p className="font-jakarta text-sec-901 text-base">{description}</p>
    </div>
  );
};

export default HeaderBox;
