/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import CustomSheet from "../shared/CustomSheet";
import Bluearrow from "@/public/svgs/Jobs/blue-arrow.svg";
import { useGetApplicationDetailsQuery } from "@/redux/features/job-posting/jobpostingApi";
import PdfImage from "@/public/svgs/Jobs/pdf.svg";
import { openExternalLink } from "@/lib/utils";
import moment from "moment";
import { TitleRoundedList } from "../ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const boxClass =
  "w-full bg-white  h-fit px-[2em]  py-[1.5em] rounded-[10px] border border-blue-200 mt-10";

const headerClass = "text-[1.5em] text-main-900 font-[400] font-rubik ";

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
  const { data } = useGetApplicationDetailsQuery(candidate?.id);




 
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
          <div className="rounded-full overflow-hidden bg-main-100">
            <Avatar className="w-20 h-20">
              <AvatarImage src={data?.data?.profile?.profile_picture} />
              <AvatarFallback>
                {data?.data?.applicant_first_name?.[0] &&
                data?.data?.applicant_last_name?.[0]
                  ? `${data?.data?.applicant_first_name[0]}${data?.data?.applicant_last_name[0]}`.toUpperCase()
                  : "NA"}
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-[1.5em] 2xl:text-[2em]  font-[600] text-main-901 capitalize">
            {data?.data?.applicant_first_name} {data?.data?.applicant_last_name}
          </h2>
        </div>
        <hr className="border-[#D2E4FF]" />
        <div className="mt-6 border border-[#D2E4FF] rounded-md p-4">
          <p className="text-lg font-semibold mb-2">About</p>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.data?.profile?.about_me,
            }}
            className="text-gray-700"
          ></div>
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
        <div className="border border-blue-200 rounded-md p-4 mt-6 mb-4">
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
        <div className={boxClass}>
          <div className="w-full flex flex-col gap-[1em]">
            <h5 className={headerClass}>Work Experience</h5>

            <div className="w-full flex flex-col gap relative">
              {(data?.data?.profile?.work_experience ?? [])?.map(
                (item: any, id: number) => (
                  <div
                    key={id.toString()}
                    className="h-full flex items-start gap-4 relative"
                  >
                    {/* Circle */}
                    <div className="relatve  h-full min-h-[5em]">
                      <div className="w-[1.5em] h-[1.5em] bg-main-100 p-[.25em]">
                        <div className="w-full h-full bg-main-600"></div>
                      </div>
                      {/* Vertical Line */}
                      {id !==
                        data?.data?.profile?.work_experience.length - 1 && (
                        <div className="absolute left-[.75em] left1/2 transform -translate-x-1/2 w-[2px] h-full bg-gray-300"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="w-full flex  items-start justify-between gap-[1em] cursor-pointer capitalize mb-[1em]">
                      <span className="flex flex-col gap-[.25em]">
                        <h2 className="text-[1em]  font-[400] text-main-901">
                          {item.job_role}
                        </h2>
                        <span
                          className="max-w-[80%] text-[.85em]  font-[200] text-main-901 mb-[1em] div-listed"
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.job_description ||
                              item?.jobDescription ||
                              "",
                          }}
                        ></span>

                        {(item?.skills as unknown as string[])?.length > 0 && (
                          <div className="w-full mt-[.5em]">
                            <TitleRoundedList
                              headerClass={headerClass + " !text-[.875em]"}
                              data={
                                (item?.skills as unknown as string[]) || [""]
                              }
                              title="Relevant Skills"
                              addOn="!bg-sec-200 !px-[1em] !py-[.5em]  "
                            />
                          </div>
                        )}
                      </span>
                      <span className="flex flex-col items-end justify-end gap-[.25em]">
                        <h2 className="text-[.875em]  font-[300] text-neutral-700 whitespace-nowrap">
                          {moment(item.start_date).format("YYYY")} -{" "}
                          {item.present
                            ? "Present"
                            : moment(item.end_date).format("YYYY")}
                        </h2>
                        <p className="text-[.85em]  font-[500] text-main-901 whitespace-nowrap mb-[1em]">
                          {item.company_name}
                        </p>
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* projects */}
        <div className="border border-blue-200 rounded-lg p-6 max-w-6xl mx-auto bg-white mt-6">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Projects</h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.profile?.projects.map((project: any, index: any) => (
              <div
                key={index}
                onClick={() =>
                  project.link
                    ? openExternalLink(project?.link || "")
                    : () => {}
                }
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
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* attached document */}
        <div className="border border-blue-200 rounded-lg p-6 max-w-6xl mx-auto bg-white mt-6 mb-10">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Attached Document
          </h2>

          {/* Document Card */}
          <div className="flex items-center border border-blue-200 rounded-lg p-4 shadow-sm bg-white">
            {/* PDF Icon */}
            <div className="flex-shrink-0 w-10 h-10">
              <Image
                // src={data?.data?.cv_file} // Replace with a proper icon if available
                src={PdfImage} 
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
                  rel="noopener noreferrer" // Makes the file downloadable with this name
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
