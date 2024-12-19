/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Users,
  UserCheck,
  CalendarDays,
  Handshake,
  LampDesk,
} from "lucide-react";
import OverviewCard from "@/components/jobboard/OverviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Jobbox from "@/components/jobboard/Jobbox";
import PreviewCard from "@/components/jobboard/PreviewCard";
import Company from "@/public/svgs/Jobs/company.svg";
import Location from "@/public/svgs/Jobs/location.svg";
import Years from "@/public/svgs/Jobs/years.svg";
import Amount from "@/public/svgs/Jobs/amount.svg";
import JobDescription from "@/components/jobboard/JobDescription";
import Image from "next/image";
import ShorlistedImg from "@/public/svgs/Jobs/shortlistedImg.svg";
import ShorlistedColun from "@/public/svgs/Jobs/shortlistedcolumn.svg";
import {
  // Interviewed,
  // candidatesShorlist,
  Evaluation,
  Offer,
  // Hired,
} from "@/constants";
import {
  useGetByJobsIdQuery,
  useGetJobApplicationsQuery,
  useGetShortlistedCandidateQuery,
  useRankApplicantsQuery,
} from "@/redux/features/job-posting/jobpostingApi";
import { useParams } from "next/navigation";
import ShortListedDetails from "@/components/jobboard/ShortListedDetails";
import CandidateCard from "@/components/jobboard/CandidateCard";
import RankedCandidatesCard from "@/components/jobboard/RankedCandidatesCard";
import JobDetailsSkeleton from "@/components/common/skeltons/JobDetailsSkeleton";
import Cookies from "js-cookie";
import { useGetSingleEmployerQuery } from "@/redux/features/auth/authApi";
import ApplicantRankingDetails from "@/components/jobboard/ApplicantRankingDetails";
import { BallsLoader } from "@/components/ui/BallsLoader";
import { Empty } from "@/components/ui/empty";

const JobPostingDetails = () => {
  const [tab, setTab] = useState("jobdetails");
  const [rankedTab, setRankedTab] = useState("");

  useEffect(() => {
    setRankedTab("");
  }, [tab]);

  // Job Details
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, isLoading: loadingJobDetails } = useGetByJobsIdQuery(id);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { data: userInfo } = useGetSingleEmployerQuery(token);

  //shortlisted
  // shortlisted tab applied
  // const { data: applieddData, isLoading: loadingApplied } =
  //   useGetShortlistedCandidateQuery({id, status:"Applied"}, {skip: tab !=="Shortlisted"});

  // shortlisted tab shortlisted
  const { data: shortlistedData } = useGetShortlistedCandidateQuery(
    { id, status: "Shortlisted" },
    { skip: tab !== "Shortlisted" }
  );

  // shortlisted tab interviewed
  // const { data: interviewedData, isLoading: loadingInterviewed } =
  //   useGetShortlistedCandidateQuery({id, status:"Interviewed"}, {skip: tab !=="Shortlisted"});

  // shortlisted  drawer control
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleShortListedCardClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsOpen(true);
  };

  // Application tab all Candidate
  const {
    data: candidateData,
    isLoading: loadCandidates,
    refetch: candidateRefetch,
  } = useGetJobApplicationsQuery(id, { skip: tab !== "applications_0" });

  const {
    data: rankedCandidate,
    isLoading: loadRanked,
    refetch: rankedRefetch,
  } = useRankApplicantsQuery(id, { skip: rankedTab === "" });

  // Application drawer control
  const [openApplicationDrawer, setOpenApplicationDrawer] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleApplicationCardClick = (applicant: any) => {
    setSelectedApplicant(applicant);
    setOpenApplicationDrawer(true);
  };

  // const isLoading =
  //   loadingJobDetails ||
  //   loadingShortlisted ||
  //   loadingApplied ||
  //   loadingInterviewed ||
  //   loadinranked;

  // const handleShortListedCardClick = (candidate: any) => {
  //   setSelectedCandidate(candidate);
  //   setIsOpen(true);
  // };

  if (loadingJobDetails) {
    return <JobDetailsSkeleton />;
  }

  // console.log("candidateData", candidateData);

  return (
    <div className="w-full">
      <Tabs defaultValue="jobdetails" className="w-full mt-3">
        <TabsList className="relative">
          <TabsTrigger
            value="jobdetails"
            className="rounded relative pb-3 transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-[#F9FAFB] data-[state=active]:after:bg-blue-500"
            onClick={() => setTab("jobdetails")}
          >
            Job Details
          </TabsTrigger>
          <TabsTrigger
            value="applications_0"
            className="relative pb-3 rounded transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-[#F9FAFB] data-[state=active]:after:bg-blue-500"
            onClick={() => setTab("applications_0")}
          >
            Applications
          </TabsTrigger>
          <TabsTrigger
            value="Shortlisted"
            className="relative pb-3 rounded transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-[#F9FAFB] data-[state=active]:after:bg-blue-500"
            onClick={() => setTab("Shortlisted")}
          >
            Shortlisted
          </TabsTrigger>
        </TabsList>
        <hr className="" />

        {/* Job Details Tab Content */}
        <TabsContent value="jobdetails">
          <div className="bg-white rounded-md p-4 mt-10">
            {/* Job Title */}
            <Jobbox
              title={data?.data?.job_title || "Job Title Not Specified"}
              variant="mb-4 text-[26px] capitalize"
            />

            {/* Preview Cards */}
            <div className="flex flex-wrap gap-5 sm:gap-3">
              {/* Company */}
              <PreviewCard
                imgUrl={Company}
                text={userInfo?.data?.company_name || "Not Specified"}
              />

              {/* Location */}
              <PreviewCard
                imgUrl={Location}
                text={
                  data?.data?.job_details?.[0]?.workPattern || "Not Specified"
                }
              />
              {/* Experience */}
              <PreviewCard
                imgUrl={Years}
                text={`${
                  data?.data?.job_details?.[0]?.experienceLevel || "N/A"
                }`}
              />
              {/* Salary */}
              <PreviewCard
                imgUrl={Amount}
                text={
                  data?.data?.job_details?.[0]?.salaryRange?.[0]
                    ? `${data.data.job_details[0].salaryRange[0].currency_code} ${data.data.job_details[0].salaryRange[0].salary_min} - ${data.data.job_details[0].salaryRange[0].salary_max}`
                    : "Salary Not Specified"
                }
              />
            </div>
            <hr className="mt-4" />

            {/* Job Description */}
            <div className="mt-4">
              <JobDescription
                title="About the company"
                description={userInfo?.data?.company_bio || "Not Specified"}
              />
            </div>

            {/* Detailed Job Information */}
            <div className="mt-4">
              <JobDescription
                title="Job Description"
                description={
                  data?.data?.job_specifications?.[0]?.jobDescription ||
                  "Not Specified"
                }
              />
            </div>
            <div className="mt-4">
              <JobDescription
                title="Qualifications"
                description={
                  data?.data?.job_specifications?.[0]?.requiredSkills ||
                  "Not Specified"
                }
              />
            </div>
            <div className="mt-4">
              <JobDescription
                title="What We Offer"
                description={data?.data?.benefits || "Not Specified"}
              />
            </div>
          </div>
        </TabsContent>

        {/* Applications Tab Content */}
        <TabsContent value="applications_0">
          <div className="mt-5">
            <Tabs
              defaultValue="all"
              className="w-full flex flex-col items-start"
            >
              <TabsList className="max-md:w-full flex flex-wrap gap-2 mb-4 lg:mr-11">
                <TabsTrigger
                  value="all"
                  className="flex items-center justify-center w-full md:w-auto py-2 rounded bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                >
                  All Candidate
                </TabsTrigger>
                <TabsTrigger
                  value="Ranked"
                  className="flex items-center justify-center w-full md:w-auto py-2 rounded bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                  onClick={() => setRankedTab("Ranked")}
                >
                  Ranked Candidate
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <>
                  {loadCandidates ? (
                    <div className="w-full min-h-screen h-screen max-h-screen flex items-center justify-center">
                      <div className="w-fit flex flex-col items-center gap-[.5em]">
                        <BallsLoader />
                        <p className="text-[.875em] text-main-900 text-center">
                          Loading Candidates...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="mt-10 !lg:mt-0 flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-[#001633] flex items-center">
                          Candidates
                          <span className="ml-2 text-sm bg-main-200 text-main-600 font-semibold px-2 py-1 rounded">
                            {candidateData?.data?.jobApplicant.length}
                          </span>
                        </h1>
                      </div>

                      <div className="w-full min-h-screen flex items-start">
                        {candidateData?.data?.jobApplicant?.length > 0 ? (
                          <div className="grid grid-cols-1 gap-[12em]">
                            {(candidateData?.data?.jobApplicant ?? [])?.map(
                              (candidate: any, index: any) => (
                                <CandidateCard
                                  key={index}
                                  {...candidate}
                                  clickFn={() =>
                                    handleApplicationCardClick(candidate)
                                  }
                                  candidateId={candidate.id}
                                  refetchFn={candidateRefetch}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <div className="w-full flex items-center justify-center">
                            <div className="w-fit mx-auto empty-box">
                              <Empty
                                title="No Candidates"
                                subtitle="No candidate has applied for this job."
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              </TabsContent>

              <TabsContent value="Ranked">
                <>
                  {loadRanked ? (
                    <div className="w-full min-h-screen h-screen max-h-screen flex items-center justify-center">
                      <div className="w-fit flex flex-col items-center gap-[.5em]">
                        <BallsLoader />
                        <p className="text-[.875em] text-main-900 text-center">
                          Ranking Candidates...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="mt-10 !lg:mt-0 flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-[#001633] flex items-center">
                          Ranked Candidates
                          <span className="ml-2 text-sm bg-main-200 text-main-600 font-semibold px-2 py-1 rounded">
                            {rankedCandidate?.data?.length}
                          </span>
                        </h1>
                      </div>

                      <div className="w-full min-h-screen flex items-start">
                        {rankedCandidate?.data.length > 0 ? (
                          <div className="flex flex-col gap-6 w-full max-w-7xl">
                            {(rankedCandidate?.data ?? [])?.map(
                              (candidate: any) => (
                                <RankedCandidatesCard
                                  key={candidate.id}
                                  {...candidate}
                                  clickFn={() =>
                                    handleApplicationCardClick(candidate)
                                  }
                                  candidateId={candidate.id}
                                  refetchFn={rankedRefetch}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <div className="w-full flex items-center justify-center">
                            <div className="w-fit mx-auto empty-box">
                              <Empty
                                title="No Candidates"
                                subtitle="No candidate has applied for this job."
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              </TabsContent>
            </Tabs>
          </div>

          <ApplicantRankingDetails
            isOpen={openApplicationDrawer}
            candidate={selectedApplicant}
            onClose={() => setOpenApplicationDrawer(false)}
          />
        </TabsContent>

        {/* Shortlisted Tab Content */}
        <TabsContent value="Shortlisted">
          <div className="mt-5 p-4">
            <div className="flex flex-nowrap gap-5 mb-5 overflow-x-auto hide-scrollbar">
              <OverviewCard
                title="Total Candidate"
                count={14}
                icon={<User className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
              <OverviewCard
                title="Shortlisted Candidate"
                count={3}
                icon={<Users className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
              <OverviewCard
                title="Interviewed Candidate"
                count={5}
                icon={<UserCheck className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
              <OverviewCard
                title="Evaluated Candidate"
                count={5}
                icon={<CalendarDays className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
              <OverviewCard
                title="Offered Candidate"
                count={5}
                icon={<Handshake className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
              <OverviewCard
                title="Hired"
                count={5}
                icon={<LampDesk className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
            </div>

            {/* Applied Candidate Sections */}
            <div className="mt-20 flex  gap-5 overflow-x-auto hide-scrollbar">
              {/* one Applied  */}
              {/* <div className=" w-full sm:w-[375px] h-full  bg-[#F2F6FB] p-4 rounded-lg hidden">
               
                <div className="flex  gap-2 lg:gap-20 items-center justify-between bg-[#FFBE3E] rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">Applied</h1>
                  <span className="bg-white text-gray-700 font-medium px-3  rounded text-sm">
                    <p>{applieddData?.data?.application?.length} Candidates</p>
                  </span>
                </div>

               
                <div className="space-y-4">
                  {applieddData?.data?.application?.length > 0 ? (
                    applieddData.data.application.map((candidate: any) => (
                      <div
                        key={candidate.id}
                        className="flex items-start bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => handleShortListedCardClick(candidate)}
                      >
                        <Image
                          src={ShorlistedImg}
                          alt="card-image"
                          width={50}
                          height={50}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />

                        
                        <div className="flex-1">
                          <div className="flex gap-2">
                            <h2 className="text-gray-900 font-semibold text-lg">
                              {candidate.applicant_first_name}
                            </h2>
                            <h2 className="text-gray-900 font-semibold text-lg">
                              {candidate.applicant_last_name}
                            </h2>
                          </div>

                          <p className="text-gray-500 text-sm">
                            {candidate.role || "Role not specified"}
                          </p>
                          <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                            {candidate.description || "No description provided"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center text-lg mt-8">
                      No candidates found :(
                    </p>
                  )}
                </div>
              </div> */}

              {/* two  Shortlisted */}
              <div className=" w-full sm:w-[375px] h-full  bg-[#F2F6FB] p-4 rounded-lg">
                {/* Header */}
                <div className="flex gap-2 lg:gap-20 items-center justify-between bg-[#1FB2AA] rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">
                    Shortlisted
                  </h1>
                  <span className="bg-white text-gray-700 font-medium px-3 rounded text-sm">
                    {shortlistedData?.data?.application?.length} Candidates
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-4">
                  {shortlistedData?.data?.application?.length > 0 ? (
                    shortlistedData.data.application.map((candidate: any) => (
                      <div
                        key={candidate.id} // Use unique key for each candidate
                        className="flex items-start bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => handleShortListedCardClick(candidate)}
                      >
                        <Image
                          src={ShorlistedImg}
                          alt="card-image"
                          width={50}
                          height={50}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />

                        {/* Candidate Information */}
                        <div className="flex-1">
                          <div className="flex gap-2">
                            <h2 className="text-gray-900 font-semibold text-lg">
                              {candidate.applicant_first_name}{" "}
                              {/* First name */}
                            </h2>
                            <h2 className="text-gray-900 font-semibold text-lg">
                              {candidate.applicant_last_name} {/* Last name */}
                            </h2>
                          </div>

                          <p className="text-gray-500 text-sm">
                            {candidate.role || "Role not specified"}{" "}
                            {/* Candidate's role */}
                          </p>
                          <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                            {candidate.description || "No description provided"}{" "}
                            {/* Candidate's description */}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center text-lg mt-8">
                      No candidates found :(
                    </p>
                  )}
                </div>
              </div>

              {/* three  evalution */}
              <div className=" w-full sm:w-[375px] h-full  bg-[#F2F6FB] p-4 rounded-lg">
                {/* Header */}
                <div className="flex gap-2 lg:gap-20 items-center justify-between bg-[#FF6347] rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">
                    Evaluation
                  </h1>
                  <span className="bg-white text-gray-700 font-medium px-3 rounded text-sm">
                    {Evaluation.length} Candidates
                  </span>
                </div>

                {/* Candidate Cards */}
                <p className="text-center">Coming Soon</p>
                <div className="space-y-4 hidden">
                  {Evaluation.map((candidate, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-white p-4 rounded-md  shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => handleShortListedCardClick(candidate)}
                    >
                      <Image
                        src={ShorlistedImg}
                        alt="card-image"
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />

                      {/* Candidate Information */}
                      <div className="flex-1">
                        <h2 className="text-gray-900 font-semibold text-lg">
                          {candidate.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {candidate.title}
                        </p>
                        <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                          {candidate.description}
                        </p>
                      </div>

                      {/* Options Button */}
                      <Image
                        src={ShorlistedColun}
                        alt="card-options"
                        width={20}
                        height={20}
                        className="mt-2 sm:mt-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* four  offer */}
              <div className=" w-full sm:w-[375px] h-full  bg-[#F2F6FB] p-4 rounded-lg">
                {/* Header */}
                <div className="flex gap-2 lg:gap-20 items-center justify-between bg-[#0061F9] rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">Offer</h1>
                  <span className="bg-white text-gray-700 font-medium px-3  rounded text-sm">
                    {Evaluation.length} Candidates
                  </span>
                </div>

                {/* Candidate Cards */}
                <p className="text-center">Coming Soon</p>
                <div className="space-y-4 hidden">
                  {Evaluation.map((candidate, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-white p-4 rounded-md  shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => handleShortListedCardClick(candidate)}
                    >
                      <Image
                        src={ShorlistedImg}
                        alt="card-image"
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />

                      {/* Candidate Information */}
                      <div className="flex-1">
                        <h2 className="text-gray-900 font-semibold text-lg">
                          {candidate.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {candidate.title}
                        </p>
                        <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                          {candidate.description}
                        </p>
                      </div>

                      {/* Options Button */}
                      <Image
                        src={ShorlistedColun}
                        alt="card-options"
                        width={20}
                        height={20}
                        className="mt-2 sm:mt-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* five  hired */}
              <div className=" w-full sm:w-[375px] h-full  bg-[#F2F6FB] p-4 rounded-lg">
                {/* Header */}
                <div className="flex gap-2 lg:gap-20 items-center justify-between bg-[#057A55] rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">Hired</h1>
                  <span className="bg-white text-gray-700 font-medium px-3  rounded text-sm">
                    {Offer.length} Candidates
                  </span>
                </div>

                {/* Candidate Cards */}
                <p className="text-center">Coming Soon</p>
                <div className="space-y-4 hidden">
                  {Offer.map((candidate, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-white p-4 rounded-md  shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => handleShortListedCardClick(candidate)}
                    >
                      <Image
                        src={ShorlistedImg}
                        alt="card-image"
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />

                      {/* Candidate Information */}
                      <div className="flex-1">
                        <h2 className="text-gray-900 font-semibold text-lg">
                          {candidate.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {candidate.title}
                        </p>
                        <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                          {candidate.description}
                        </p>
                      </div>

                      {/* Options Button */}
                      <Image
                        src={ShorlistedColun}
                        alt="card-options"
                        width={20}
                        height={20}
                        className="mt-2 sm:mt-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ShortListedDetails
            isOpen={isOpen}
            candidate={selectedCandidate}
            onClose={() => setIsOpen(false)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobPostingDetails;
