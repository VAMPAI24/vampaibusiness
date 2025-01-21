import Image from "next/image";
import React from "react";

interface CandidateCardProps {
  imgURL: string;
  name: string;
  role: string;
  yearsExp: string;
  skills: string[];
}

const CandidateCard = ({
  imgURL,
  name,
  role,
  yearsExp,
  skills,
}: CandidateCardProps) => {
  return (
    <div className="bg-white w-full lg:w-[370px]  rounded-lg p-6 flex flex-col items-center md:items-start border shadow-sm">
      <div className="flex gap-2">
        <Image
          src={imgURL}
          alt={`${name}'s avatar`}
          width={64}
          height={64}
          className="rounded-full mb-4"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500 flex items-center">
            {role} <span className="px-1 text-gray-400">·</span> {yearsExp}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700 font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CandidateCard;
