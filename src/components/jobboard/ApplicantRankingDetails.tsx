/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import CustomSheet from "../shared/CustomSheet";
import { experiences } from "@/constants";
import Bluearrow from "@/public/svgs/Jobs/blue-arrow.svg";
import { useGetApplicationDetailsQuery } from "@/redux/features/job-posting/jobpostingApi";
import Link from "next/link";
import PdfImage from "@/public/svgs/Jobs/pdf.svg";

// interface
export interface ApplicantRankingDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    id: string;
    name: string;
    title: string;
    description: string;
    desiredRoles: string[];
    industries: string[];
    skills: string[];
    workExperience: {
      role: string;
      company: string;
      year: string;
      description: string;
    }[];
  } | null;
}

const ApplicantRankingDetails = ({
  isOpen,
  onClose,
  candidate,
}: ApplicantRankingDetailsProps) => {
  
  const { data } = useGetApplicationDetailsQuery(candidate?.id );




  // Pdf name
  const pdfUrl = data?.data?.cv_file;
  const pdfName = pdfUrl ? pdfUrl.split("/").pop() : "";




    if (!candidate) return null;



  return (
    <CustomSheet
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-full !p-0"
    >
      <div className="flex-1 px-8 overflow-auto h-screen hide-scrollbar">
        <div className="flex items-center gap-3 mb-4 mt-10">
          <Image
            src={data?.data?.profile?.profile_picture}
            alt="nnnnnnn"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex gap-4">
            <h2 className="text-sec-901 font-rubik text-lg sm:text-[24px] capitalize">
              {data?.data.applicant_first_name}
            </h2>

            <h2 className="text-sec-901 font-rubik text-lg sm:text-[24px] capitalize">
              {data?.data.applicant_last_name}
            </h2>
          </div>
        </div>
        <hr className="border-[#D2E4FF]" />
        <div className="mt-6 border border-[#D2E4FF] rounded-md p-4">
          <p className="text-lg font-semibold mb-2">About</p>
          <div dangerouslySetInnerHTML={{
            __html: data?.data?.profile?.about_me,
          }} className="text-gray-700"></div>
        </div>
        <div className="border border-blue-200 rounded-md p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Desired Role
          </h3>
          <div className="flex flex-wrap gap-4">
            {data?.data?.profile?.desired_roles.map((role: any, index: any) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        <div className="border border-blue-200 rounded-md p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Industries
          </h3>
          <div className="flex flex-wrap gap-4">
            {data?.data?.profile?.industries.map((role: any, index: any) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        <div className="border border-blue-200 rounded-md p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top skills
          </h3>
          <div className="flex flex-wrap gap-4">
            {data?.data?.profile?.skills.map((skill: any, index: any) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        {/* work experience  */}
        <div className="p-6 bg-white border border-blue-100 rounded-lg shadow-sm max-w-4xl mx-auto mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Work experience
          </h2>
          <div className="space-y-6">
            {data?.data?.profile?.work_experience.map(
              (experience: any, index: any) => (
                <div
                  key={index}
                  className="relative flex items-start space-x-4"
                >
                  {/* Left Indicator */}
                  <div className="w-12 flex items-center justify-center">
                    <div className="bg-gray-200 border-2 border-blue-200 w-20 h-12 rounded-lg flex items-center justify-center">
                      {/* Placeholder for avatar/icon */}
                    </div>
                    {index < experiences.length - 1 && (
                      <div className="absolute top-10 left-6 h-full w-[1px] bg-gray-300"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex justify-between rounded-lg p-4">
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {experience?.job_role}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 w-[50%]">
                        {experience.job_description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start text-sm text-gray-500 mt-3">
                      <div>
                        <span>{experience.start_date}</span> -{" "}
                        <span>{experience.end_date}</span>
                      </div>

                      <span>{experience.company_name}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* projects */}
        <div className="border border-gray-200 rounded-lg p-6 max-w-6xl mx-auto bg-white mt-6">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Projects</h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.profile?.projects.map((project:any, index: any) => (
              <Link key={project.link.toString()} href={project.link}>
               <div
                key={index}
                className="flex flex-col justify-between border border-gray-200 rounded-lg p-4 shadow-sm bg-white relative"
                
              >
                {/* Content */}

                <div className="flex justify-end mb-8">
                  <Image
                    src={Bluearrow}
                    alt="blue-arrow"
                    width={25}
                    height={25}
                  />
                </div>
                <div className="h-40">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {project.description.slice(0, 200)}
                  </p>
                </div>
              </div>
              </Link>
             
            ))}
          </div>
        </div>

        {/* attached document */}
        <div className="border border-gray-200 rounded-lg p-6 max-w-6xl mx-auto bg-white mt-6 mb-10">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Attached Document
          </h2>

          {/* Document Card */}
          <div className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
            {/* PDF Icon */}
            <div className="flex-shrink-0 w-10 h-10">
              <Image
                // src={data?.data?.cv_file} // Replace with a proper icon if available
                src={PdfImage} // Replace with a proper icon if available
                alt="PDF Icon"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            {/* Document Name and Download Link */}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-800">
                <a
                  href={data?.data?.cv_file} // File URL
                  download={pdfName}
                  target="_blank" 
                  rel="noopener noreferrer"  // Makes the file downloadable with this name
                  className="text-blue-600 hover:underline"
                >
                  {pdfName}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomSheet>
  );
};

export default ApplicantRankingDetails;
