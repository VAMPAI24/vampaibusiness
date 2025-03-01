/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import OverviewCard from "@/components/jobboard/OverviewCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewCard from "@/components/jobboard/PreviewCard";
import Company from "@/public/svgs/Jobs/company.svg";
import Location from "@/public/svgs/Jobs/location.svg";
import Years from "@/public/svgs/Jobs/years.svg";
import Amount from "@/public/svgs/Jobs/amount.svg";
import JobDescription from "@/components/jobboard/JobDescription";
import Image from "next/image";
import ShorlistedImg from "@/public/svgs/Jobs/shortlistedImg.svg";
import ShorlistedColun from "@/public/svgs/Jobs/shortlistedcolumn.svg";
import { Evaluation, Offer } from "@/constants";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/common/loader/Loader";
import { formatAndTransformString } from "@/lib/utils";
import { RootState } from "@/redux/app/store";
import { MainModal } from "@/components/common/modal";
import { setCurrJobPost } from "@/redux/features/job-posting/jobpostingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { JobPostSuccess } from "@/components/jobboard/JobPostSuccess";
import { Platformbtn } from "@/components/common/buttons";
import { Titlesubtitle } from "@/components/common/titlesub";
import { Ovwcard } from "@/components/common/OvwCard";

const JobPostingDetails = () => {
  const [tab, setTab] = useState("jobdetails");
  const [rankedTab, setRankedTab] = useState("");

  const { showJobSuccess } = useAppSelector(
    (store: RootState) => store.jobPost
  );

  useEffect(() => {
    setRankedTab("");
  }, [tab]);

  // Job Details
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, isLoading: loadingJobDetails } = useGetByJobsIdQuery(id);
  const [token, setToken] = useState<string | null>(null);

  const dispatch = useAppDispatch();

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
  const { data: shortlistedData, isLoading: shortlistedDataLoading } =
    useGetShortlistedCandidateQuery(
      { id, status: "Shortlisted" },
      { skip: tab !== "Shortlisted" }
    );

  // shortlisted tab rejected
  const { data: rejectedData, isLoading: rejectedDataLoading } =
    useGetShortlistedCandidateQuery(
      { id, status: "Rejected" },
      { skip: tab !== "Shortlisted" }
    );

  // shortlisted  drawer control
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleShortListedCardClick = (candidate: any) => {
    setSelectedCandidate(candidate);
    setIsOpen(true);
  };

  // Application tab All Candidate
  const {
    data: candidateData,
    isLoading: loadCandidates,
    refetch: candidateRefetch,
  } = useGetJobApplicationsQuery(id, { skip: tab !== "applications_0" });

  // Application tab Ranked Candidate

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

  // console.log(candidateData?.data);

  const openCloseShare = (value?: string) => {
    const payload = {
      showJobSuccess: value ? true : false,
      postId: value ? id : "",
    };
    dispatch(setCurrJobPost(payload));
  };

  if (loadingJobDetails) {
    return <JobDetailsSkeleton />;
  }

  return (
    <div className="w-full">
      <MainModal
        visible={showJobSuccess}
        close={openCloseShare}
        closable={false}
      >
        <JobPostSuccess showSuccess={false} clickFn={openCloseShare} />
      </MainModal>
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
            <div className="w-full flex flex-col gap-[1em]">
              <div className="w-full flex items-end justify-between mb-[1.5em]">
                <Titlesubtitle
                  title={`${data?.data?.job_title ?? "N/A"} Overview`}
                  tclass="!text-[1.25em]"
                />
                <Platformbtn
                  type="secondary"
                  name="Share Job"
                  click={() => openCloseShare("open")}
                  addOns="!w-fit  md:!px-[1.5em] rounded-full"
                />
              </div>
            </div>

            <div className="w-full flex flex-wrap gap-[.75em]">
              {/* Company */}
              <PreviewCard
                imgUrl={Company}
                text={userInfo?.data?.company_name || "Not Specified"}
                addOn="bg-neutral-200 text-neutral-600 px-[1em]  py-[.75em]      capitalize rounded-[.65em] hover:bg-main-600  group "
              />

              {/* Location */}
              <PreviewCard
                imgUrl={Location}
                text={
                  data?.data?.job_details?.[0]?.workPattern || "Not Specified"
                }
                addOn="bg-orange-200 text-orange-800 px-[1em]  py-[.75em]  capitalize rounded-[.65em] hover:bg-main-600  group"
              />
              {/* Experience */}
              <PreviewCard
                imgUrl={Years}
                text={`${
                  data?.data?.job_details?.[0]?.experienceLevel || "N/A"
                }`}
                addOn="bg-yellow-200 text-yellow-800 px-[1em]  py-[.75em]      capitalize rounded-[.65em] hover:bg-main-600  group"
              />
              {/* Salary */}
              <PreviewCard
                imgUrl={Amount}
                text={
                  data?.data?.job_details?.[0]?.salaryRange?.[0].salary_min
                    ? `${data.data.job_details[0].salaryRange[0].currency_code} ${data.data.job_details[0].salaryRange[0].salary_min} - ${data.data.job_details[0].salaryRange[0].salary_max}`
                    : "N/A"
                }
                addOn="bg-green-200 text-green-800 px-[1em]  py-[.75em]      capitalize rounded-[.65em] hover:bg-main-600  group"
              />
            </div>

            <div className="w-full flex flexwrap items-center gap-[10px] lg:gap-[20px] mt-[1.5em] overflow-x-scroll hide-scrollbar ">
              <Ovwcard title="Total Views" value={data?.data?.views ?? 0} />
              <Ovwcard
                title="Total Applicants"
                value={data?.data?.total_applicant ?? 0}
              />
              <Ovwcard
                title="Total Shortlisted"
                value={data?.data?.total_shortlisted ?? 0}
              />
            </div>

            <hr className="mt-4" />

            <div className="w-full md:w-[70%] flex flex-col gap-[1em] mt-[1.5em]">
              <JobDescription
                title="About the company"
                description={userInfo?.data?.company_bio || "Not Specified"}
              />
              <JobDescription
                title="Job Description"
                description={
                  data?.data?.job_specifications?.[0]?.jobDescription ||
                  "Not Specified"
                }
              />
              <JobDescription
                title="Qualifications"
                description={
                  data?.data?.job_specifications?.[0]?.requiredSkills ||
                  "Not Specified"
                }
              />
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

              <TabsContent value="all" className="w-full">
                <>
                  {loadCandidates ? (
                    <div className="w-full  flex items-center justify-center">
                      <div className="w-fit h-[10em] mt-10 lg:mt-0 flex flex-col items-center justify-center gap-[.5em]">
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
                          {candidateData?.data?.length > 0 ||
                            (candidateData?.data?.jobApplicant?.length > 0 && (
                              <span className="ml-2 text-sm bg-main-200 text-main-600 font-semibold px-2 py-1 rounded">
                                {candidateData?.data?.length ??
                                  candidateData?.data?.jobApplicant?.length}
                              </span>
                            ))}
                        </h1>
                      </div>

                      <div className="w-full min-h-screen flex items-start">
                        {candidateData?.data?.length > 0 ||
                        candidateData?.data?.jobApplicant?.length > 0 ? (
                          <div className="grid grid-cols-1 gap-[1em]">
                            {(
                              candidateData?.data ??
                              candidateData?.data?.jobApplicant ??
                              []
                            )?.map((candidate: any, index: any) => (
                              <CandidateCard
                                key={index}
                                {...candidate}
                                clickFn={() =>
                                  handleApplicationCardClick(candidate)
                                }
                                candidateId={candidate.id}
                                refetchFn={candidateRefetch}
                              />
                            ))}
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

              <TabsContent value="Ranked" className="w-full">
                <>
                  {loadRanked ? (
                    <div className="w-full flex items-center justify-center">
                      <div className="w-fit h-[10em] flex flex-col items-center justify-center gap-[.5em]">
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
                          {rankedCandidate?.data?.length > 0 && (
                            <span className="ml-2 text-sm bg-main-200 text-main-600 font-semibold px-2 py-1 rounded">
                              {rankedCandidate?.data?.length}
                            </span>
                          )}
                        </h1>
                      </div>

                      <div className="w-full min-h-screen flex items-start">
                        {rankedCandidate?.data.length > 0 ? (
                          <div className="flex flex-col gap-[1em] w-full max-w-7xl">
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
                title="Shortlisted Candidate"
                count={shortlistedData?.data?.count}
                icon={<Users className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
              <OverviewCard
                title="Rejected Candidate"
                count={rejectedData?.data?.count}
                icon={<Users className="text-main-901" size={20} />}
                className="flex-shrink-0 hover:bg-main-600 hover:text-white"
              />
            </div>

            <div className="mt-20 flex  gap-5 overflow-x-auto hide-scrollbar">
              {/* two  Shortlisted */}
              <div className=" w-full sm:w-[375px] h-full  bg-[#F2F6FB] p-4 rounded-lg">
                {/* Header */}
                <div className="flex gap-2 lg:gap-20 items-center justify-between bg-[#1FB2AA] rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">
                    Shortlisted
                  </h1>

                  <span className="bg-white  whitespace-nowrap text-gray-700 font-medium px-3 rounded text-sm">
                    {shortlistedData?.data?.result?.length} Candidates
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-4">
                  {shortlistedDataLoading ? (
                    <div className="text-center text-gray-500">
                      <Loader />
                    </div>
                  ) : shortlistedData?.data?.result?.length > 0 ? (
                    shortlistedData.data.result.map((candidate: any) => (
                      <div
                        key={candidate.id} // Use unique key for each candidate
                        className="flex  gap-2 items-start bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => handleShortListedCardClick(candidate)}
                      >
                        <Avatar>
                          <AvatarImage src={candidate?.profile_picture} />
                          <AvatarFallback>
                            {candidate.applicant_first_name?.[0] &&
                            candidate.applicant_last_name?.[0]
                              ? `${candidate.applicant_first_name?.[0]}${candidate.applicant_last_name?.[0]}`.toUpperCase()
                              : "NA"}
                          </AvatarFallback>
                        </Avatar>

                        {/* Candidate Information */}
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:gap-2 break-words">
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

                          <div
                            className="text-[.875em] text-gray-700 mt-1 line-clamp-3 font-[300] "
                            dangerouslySetInnerHTML={{
                              __html: formatAndTransformString(
                                candidate.description ||
                                  "No description provided"
                              ),
                            }}
                          ></div>

                          {/* <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                            {candidate.description || "No description provided"}{" "}
                          </p> */}
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

              {/* Rejected Candidate  */}
              <div className=" w-full sm:w-[375px] h-full bg-[#F2F6FB]  p-4 rounded-lg">
                {/* Header */}
                <div className="flex gap-2 lg:gap-20 items-center justify-between bg-red-500 rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">
                    Rejected
                  </h1>
                  <span className="bg-white  whitespace-nowrap text-gray-700 font-medium px-3 rounded text-sm">
                    {rejectedData?.data?.result?.length} Candidates
                  </span>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-4">
                  {rejectedDataLoading ? (
                    <div className="text-center text-gray-500">
                      <Loader />
                    </div>
                  ) : rejectedData?.data?.result?.length > 0 ? (
                    rejectedData.data.result.map((candidate: any) => (
                      <div
                        key={candidate.id} // Use unique key for each candidate
                        className="flex gap-2 items-start bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => handleShortListedCardClick(candidate)}
                      >
                        <Avatar>
                          <AvatarImage src={candidate?.profile_picture} />
                          <AvatarFallback>
                            {candidate.applicant_first_name?.[0] &&
                            candidate.applicant_last_name?.[0]
                              ? `${candidate.applicant_first_name?.[0]}${candidate.applicant_last_name?.[0]}`.toUpperCase()
                              : "NA"}
                          </AvatarFallback>
                        </Avatar>

                        {/* Candidate Information */}
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:gap-2">
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

              {/* three  Assessment */}
              <div className=" w-full sm:w-[375px] h-full  bg-[#F2F6FB] p-4 rounded-lg">
                {/* Header */}
                <div className="flex gap-2 lg:gap-20 items-center justify-between bg-purple-500 rounded-md px-6 py-2 mb-4">
                  <h1 className="text-white font-semibold  text-lg">
                    Assessment
                  </h1>
                  <span className="bg-white  whitespace-nowrap text-gray-700 font-medium px-3 rounded text-sm">
                    Candidates
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
                  <span className="bg-white  whitespace-nowrap text-gray-700 font-medium px-3  rounded text-sm">
                    Candidates
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
                  <span className="bg-white whitespace-nowrap text-gray-700 font-medium px-3  rounded text-sm">
                    Candidates
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
