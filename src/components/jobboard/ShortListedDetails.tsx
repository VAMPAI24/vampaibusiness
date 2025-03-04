/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
import CustomSheet from "../shared/CustomSheet";
import { CalendarDays, CalendarPlus2, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SubmitButton from "@/components/shared/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/lib/schemas";
import { Form } from "@/components/ui/form";
import { z } from "zod";
// import { interviews } from "@/constants";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
import CustomModal from "@/components/shared/CustomModal";
import EventModalContent from "./EventModalContent";
import ShareModalContent from "./ShareModalContent";
import {
  useGetAllEventQuery,
  useGetApplicationDetailsQuery,
} from "@/redux/features/job-posting/jobpostingApi";
import Link from "next/link";
import Bluearrow from "@/public/svgs/Jobs/blue-arrow.svg";
import moment from "moment";
import { openExternalLink } from "@/lib/utils";
import { TitleRoundedList } from "../ui";
import PdfImage from "@/public/svgs/Jobs/pdf.svg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const boxClass =
  "w-full bg-white  h-fit px-[2em]  py-[1.5em] rounded-[10px] border border-blue-200 ";

const headerClass = "text-[1.5em] text-main-900 font-[400] font-rubik ";

// interface
export interface ShortListedDetailsProps {
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

const ShortListedDetails = ({
  isOpen,
  onClose,
  candidate,
}: ShortListedDetailsProps) => {
  // Overview api call
  const { data, isLoading } = useGetApplicationDetailsQuery(candidate?.id);

  const pdfUrl = data?.data?.cv_file;
  const pdfName = pdfUrl ? pdfUrl.split("/").pop() : "";

  //Note form
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      first_name: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // schdule modal control
  const [open, setOpen] = useState(false);
  const openCloseModalFn = () => setOpen(!open);

  // share modal constrol
  const [shareOpen, setShareOpen] = useState(false);
  const shareOpenCloseModalFn = () => setShareOpen(!shareOpen);

  // Fetch Event Data
  const { data: eventData } = useGetAllEventQuery({ max_result: 200 });

  if (!candidate) return null;

  return (
    <CustomSheet
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-full !p-0"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="flex-1 p-4 overflow-auto h-screen hide-scrollbar">
          <div className="relative w-full lg:mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={data?.data?.profile?.profile_picture} />
                  {/* <AvatarFallback>
                    {data?.data?.applicant_first_name?.[0] &&
                    data?.data?.applicant_last_name?.[0]
                      ? `${data?.data?.applicant_first_name[0]}${data?.data?.applicant_last_name[0]}`.toUpperCase()
                      : "NA"}
                  </AvatarFallback> */}
                </Avatar>

                <div className="flex gap-2">
                  <h2 className="text-sec-901 font-rubik text-lg sm:text-[24px]">
                    {data?.data?.applicant_first_name}
                  </h2>

                  <h2 className="text-sec-901 font-rubik text-lg sm:text-[24px]">
                    {data?.data?.applicant_last_name}
                  </h2>
                </div>
              </div>
              <div className="flex justify-center mt-4 sm:mt-0 gap-4">
                <button
                  onClick={openCloseModalFn}
                  className="text-gray-600 flex text-sm items-center gap-1 hover:underline"
                >
                  <CalendarDays />
                  Schedule
                </button>
                <button
                  onClick={shareOpenCloseModalFn}
                  className="text-gray-600 flex text-sm gap-1 items-center hover:underline"
                >
                  <UserPlus />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="md:block hidden">
            <Tabs defaultValue="overview" className="w-full mt-3">
              <TabsList className="relative flex flex-wrap justify-start">
                <TabsTrigger
                  value="overview"
                  className="rounded relative pb-3 transition-colors w-1/4 sm:w-auto after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-white data-[state=active]:after:bg-blue-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="message"
                  className="rounded relative pb-3 transition-colors w-1/4 sm:w-auto after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-white data-[state=active]:after:bg-blue-500"
                >
                  Message
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="rounded relative pb-3 transition-colors w-1/4 sm:w-auto after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-white data-[state=active]:after:bg-blue-500"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="evaluation"
                  className="rounded relative pb-3 transition-colors w-1/4 sm:w-auto after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-white data-[state=active]:after:bg-blue-500"
                >
                  Evaluation
                </TabsTrigger>
              </TabsList>
              <hr className="border-[#D2E4FF]" />

              <TabsContent value="overview">
                {/* Overview  */}
                <div className="flex-1 px-8 overflow-auto h-screen hide-scrollbar">
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    <>
                      {/* <div className="flex items-center gap-3 mb-4 mt-10">
                        <div className="rounded-full overflow-hidden bg-main-100">
                          <Avatar className="w-20 h-20">
                            <AvatarImage
                              src={data?.data?.profile?.profile_picture}
                            />
                            <AvatarFallback>
                          {data?.data?.applicant_first_name?.[0] &&
                          data?.data?.applicant_last_name?.[0]
                            ? `${data?.data?.applicant_first_name[0]}${data?.data?.applicant_last_name[0]}`.toUpperCase()
                            : "NA"}
                        </AvatarFallback>
                          </Avatar>
                        </div>
                        <h2 className="text-[1.5em] 2xl:text-[2em] text-main-901 capitalize">
                          {data?.data?.applicant_first_name}{" "}
                          {data?.data?.applicant_last_name}
                        </h2>
                      </div>
                      <hr className="border-[#D2E4FF]" /> */}
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
                          {data?.data?.profile?.desired_roles.map(
                            (role: any, index: any) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {role}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="border border-blue-200 rounded-md p-4 mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Industries
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {data?.data?.profile?.industries.map(
                            (role: any, index: any) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {role}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="border border-blue-200 rounded-md p-4 mt-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Top skills
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {data?.data?.profile?.skills.map(
                            (skill: any, index: any) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
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
                                      data?.data?.profile?.work_experience
                                        .length -
                                        1 && (
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
                                      {(item?.skills as unknown as string[])
                                        ?.length > 0 && (
                                        <div className="w-full mt-[.5em]">
                                          <TitleRoundedList
                                            headerClass={
                                              headerClass + " !text-[.875em]"
                                            }
                                            data={
                                              (item?.skills as unknown as string[]) || [
                                                "",
                                              ]
                                            }
                                            title="Relevant Skills"
                                            addOn="!bg-sec-200 !px-[1em] !py-[.5em]  "
                                          />
                                        </div>
                                      )}
                                    </span>
                                    <span className="flex flex-col items-end justify-end gap-[.25em]">
                                      <h2 className="text-[.875em]  font-[300] text-neutral-700 whitespace-nowrap">
                                        {moment(item.start_date).format("YYYY")}{" "}
                                        -{" "}
                                        {item.present
                                          ? "Present"
                                          : moment(item.end_date).format(
                                              "YYYY"
                                            )}
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
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                          Projects
                        </h2>

                        {/* Grid Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {data?.data?.profile?.projects.map(
                            (project: any, index: any) => (
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
                                  <p className="text-sm text-gray-600 mt-2 line-clamp-5">
                                    {project.description}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {data?.data?.profile?.profiling_video && (
                        <div className="border border-blue-200 rounded-lg p-6 max-w-6xl mx-auto bg-white mt-6">
                          {/* Header */}
                          <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Introduction
                          </h2>
                          <video width="100%" height="auto" controls>
                            <source
                              src={
                                data?.data?.profile?.profiling_video as string
                              }
                              className="height"
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}

                      {/* attached document */}
                      <div className="border border-blue-200 rounded-lg p-6 max-w-6xl mx-auto bg-white mt-6 mb-10">
                        {/* Header */}
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Attached Document
                        </h2>

                        {/* Document Card */}
                        <div className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
                          {/* PDF Icon */}
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image
                              // src={data?.data?.cv_file}
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
                                href={data?.data?.cv_file}
                                download={pdfName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {pdfName}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="message">
                <div className="text-center mt-10 bg-main-100 text-main-900 px-[1em] py-[.5em] rounded-[.25em] ">
                  <h1>Coming soon</h1>
                </div>
              </TabsContent>

              <TabsContent value="events">
                <div className="p-6 min-h-screen">
                  {/* Header Section */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h1 className="text-lg font-rubik font-semibold text-[#21243D]">
                        Scheduled Interview
                      </h1>
                      <p className="text-gray-600 font-jakarta text-sm">
                        Manage and review all your upcoming interviews
                      </p>
                    </div>
                    <SubmitButton
                      clickFn={openCloseModalFn}
                      className="flex gap-2 rounded"
                    >
                      <CalendarPlus2 />
                      Schedule Event
                    </SubmitButton>
                  </div>

                  {/* List of Interviews */}
                  <div className="space-y-6 hidden">
                    {eventData?.data?.length > 0 ? (
                      eventData?.data?.map((interview: any, index: any) => (
                        <Link
                          key={interview.link.toString()}
                          href={interview.link}
                        >
                          <div
                            key={index}
                            className="flex  justify-between items-center bg-white p-4 rounded shadow border border-gray-200"
                          >
                            <div className="flex mb-2 items-center">
                              <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                  {interview.title}
                                </h2>
                                <p className="text-sm text-gray-600">
                                  {interview.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                {interview.date_time}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center rounded mt-40">
                        <h2 className="font-semibold font-rubik text-[24px]  text-[#2A3147]">
                          No Upcoming Events
                        </h2>
                        <p className="text-[#4c5366] font-jakarta text-md font-normal text-center mb-4">
                          Schedule an event with a candidate, and it will be
                          displayed here
                        </p>
                        <SubmitButton
                          clickFn={openCloseModalFn}
                          className="rounded"
                        >
                          Schedule an Interview
                        </SubmitButton>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="evaluation">
                <div className="text-center mt-10 bg-main-100 text-main-900 px-[1em] py-[.5em] rounded-[.25em] ">
                  <h1>Coming soon</h1>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] border-[#D2E4FF] border-l h-screen"></div>

        {/* Right Sidebar */}
        <div className="w-full md:w-80 px-4 rounded lg:pt-16 overflow-auto h-screen hide-scrollbar">
          <div className="border border-blue-200 rounded-lg p-6">
            {/* Title Section */}
            <div className="flex items-center gap-4 mb-4">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <h2 className="text-sm lg:text-lg  font-semibold font-jakarta text-main-901">
                {candidate.title}
              </h2>
            </div>
            {/* Details Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm font-jakarta font-medium">
                  Stage
                </p>
                <span className="bg-[#FFBE3E] text-white px-3 py-1 rounded text-sm font-medium">
                  Shortlisted
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm font-jakarta font-medium">
                  Date Created
                </p>
                <p className="text-main-902 font-jakarta text-xs font-medium">
                  20 Nov 2024
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm font-jakarta font-medium">
                  Hiring Manager
                </p>
                <p className="text-gray-400">-</p>
              </div>
            </div>
            <SubmitButton className="w-full mt-4 rounded">
              {/* Next Stage */}
              Coming Soon
            </SubmitButton>
          </div>

          {/* Notes Section */}
          <div className="p-4 border border-[#D2E4FF] rounded-md mt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="first_name"
                  label="Notes"
                  placeholder="Write your notes here..."
                  variant="h-20 w-full"
                />
                <SubmitButton className="w-full mt-4 rounded">
                  {/* Send */}
                  Coming Soon
                </SubmitButton>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Schedule Event Modal */}
      <CustomModal
        isOpen={open}
        onClose={openCloseModalFn}
        className={"w-[95%] md:max-w-lg"}
        // className={"w-[95%] h-[95%] lg:h-[90%] md:max-w-lg"}
      >
        <EventModalContent
          name={
            data?.data.applicant_first_name +
            " " +
            data?.data.applicant_last_name
          }
          firstName={data?.data.applicant_first_name ?? ""}
          email={data?.data.applicant_email ?? ""}
          onClose={openCloseModalFn}
          applicant_Id={data.data?.profile?.id ?? ""}
        />
      </CustomModal>

      {/* Share Event Modal  */}
      <CustomModal
        isOpen={shareOpen}
        onClose={shareOpenCloseModalFn}
        className={"w-[95%] h-[80%] md:max-h-[60%] md:max-w-lg overflow-hidden"}
        // className={"w-[95%] md:max-w-lg"}
      >
        <ShareModalContent />
      </CustomModal>
    </CustomSheet>
  );
};

export default ShortListedDetails;
