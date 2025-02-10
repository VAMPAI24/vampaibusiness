"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Jobbox from "@/components/jobboard/Jobbox";
import { Briefcase, CalendarClock, Gift, Sun, Pencil } from "lucide-react";
import AvaterJobs from "@/public/svgs/Jobs/avatar.svg";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/shared/SubmitButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Jobpointer from "@/components/jobboard/Jobpointer";
import {
  EmploymentType,
  ExperienceLevel,
  SalaryRange,
  WorkPattern,
} from "@/constants";
import { SelectItem } from "@/components/ui/select";
import {
  benefitDetailsSchema,
  jobDetailsSchema,
  jobSpecificationSchema,
  jobTitleSchema,
} from "@/lib/schemas";
//Preview
import PreviewCard from "@/components/jobboard/PreviewCard";
import Company from "@/public/svgs/Jobs/company.svg";
import Location from "@/public/svgs/Jobs/location.svg";
import Years from "@/public/svgs/Jobs/years.svg";
import Amount from "@/public/svgs/Jobs/amount.svg";
import JobDescription from "@/components/jobboard/JobDescription";

import { useGetSingleEmployerQuery } from "@/redux/features/auth/authApi";
import {
  useBenefitDetailReWriteAIMutation,
  useBenefitDetailWriteAIMutation,
  useGetJobsInDraftQuery,
  useGetSingleActiveJobQuery,
  useJobDescriptionAIMutation,
  useJobDescriptionAIRewiteMutation,
  usePostActiveJobMutation,
  useRequiredSkillMutation,
  useSaveJobToDraftMutation,
  useUpdateJobInDraftMutation,
} from "@/redux/features/job-posting/jobpostingApi";
import ToastNotification from "@/components/shared/ToastNotification";
import JobOverview from "@/components/jobboard/JobOverview";
import Cookies from "js-cookie";
import DratfEditSkeleton from "@/components/common/skeltons/DratfEditSkeleton";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { RootState } from "@/redux/app/store";
import { MainModal } from "@/components/common/modal";
import { setCurrJobPost } from "@/redux/features/job-posting/jobpostingSlice";
import { JobPostSuccess } from "@/components/jobboard/JobPostSuccess";
import { sendEvents } from "@/lib/events";
import {
  arrayToHtml,
  cleanSkillsHTML,
  formatTextToHtml,
  htmlToArray,
} from "@/lib/formatters";

import dynamic from "next/dynamic";

const TextEditor = dynamic(
  () => import("@/components/common/inputs/CkEditor"),
  { ssr: false }
);

const JobPosting = () => {
  // const [currentView, setCurrentView] = useState("jobAds");
  const [currentView, setCurrentView] = useState("overview");
  const [currentTab, setCurrentTab] = useState("details");

  const { showJobSuccess } = useAppSelector(
    (store: RootState) => store.jobPost
  );

  const dispatch = useAppDispatch();

  //// Active job control
  const methods = useForm<
    z.infer<
      | typeof jobTitleSchema
      | typeof jobDetailsSchema
      | typeof jobSpecificationSchema
      | typeof benefitDetailsSchema
    >
  >({
    resolver: zodResolver(
      currentView === "createJob"
        ? jobTitleSchema
        : currentTab === "details"
        ? jobDetailsSchema
        : currentTab === "specification"
        ? jobSpecificationSchema
        : benefitDetailsSchema
    ),
    defaultValues: {
      job_title: "",
      experienceLevel: "",
      workPattern: "",
      employmentType: "",
      currency_code: "",
      salary_min: "",
      salary_max: "",
      rate: "",
      applicationDeadline: "",
      jobDescription: "",
      requiredSkills: "",
      benefits: "",
    },
  });

  const { control, setValue, watch } = methods;

  const handleNextTab = () => {
    const tabOrder = ["details", "specification", "benefit"];
    const currentIndex = tabOrder.indexOf(currentTab);
    const nextIndex = Math.min(currentIndex + 1, tabOrder.length - 1);
    setCurrentTab(tabOrder[nextIndex]);
  };

  // Required skill picker Controller
  const currentSkills = watch("requiredSkills");
  const handleOptionClick = (skill: string) => {
    // const updatedSkills = currentSkills ? `${currentSkills}, ${skill}` : skill;
    // setValue("requiredSkills", `<li>${updatedSkills}</li>`);

    const cleanedSkills = cleanSkillsHTML(currentSkills);

    // Add the new skill
    const updatedSkills = `<ul>${[...cleanedSkills, skill]
      .map((s) => `<li>${s}</li>`)
      .join("")}</ul>`;

    console.log(updatedSkills);

    // Set updated skills correctly
    setValue("requiredSkills", updatedSkills);
  };

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { data: userInfo } = useGetSingleEmployerQuery(token, {
    skip: currentView !== "jobPreview",
  });

  // Post job to active and draft control
  const [postActiveJob, { isLoading: postLoading }] =
    usePostActiveJobMutation();
  const [saveJobToDraft, { isLoading: draftLoading }] =
    useSaveJobToDraftMutation();

  // Post a  Job Handler
  const onSubmit = async (
    values: z.infer<
      | typeof jobTitleSchema
      | typeof jobDetailsSchema
      | typeof jobSpecificationSchema
      | typeof benefitDetailsSchema
    >
  ) => {
    if (currentView === "createJob") {
      setCurrentView("editJob");
    } else if (currentTab === "details") {
      handleNextTab();
    } else if (currentTab === "specification") {
      handleNextTab();
    } else if (currentTab === "benefit" && currentView !== "jobPreview") {
      setCurrentView("jobPreview");
    } else {
      if (
        "experienceLevel" in values &&
        "workPattern" in values &&
        "jobDescription" in values &&
        "benefits" in values
      ) {
        const payload = {
          job_title: values.job_title,
          job_details: [
            {
              experienceLevel: values.experienceLevel,
              workPattern: values.workPattern,
              employmentType: values.employmentType,
              salaryRange: [
                {
                  currency_code: values.currency_code || "",
                  salary_min: values.salary_min || "",
                  salary_max: values.salary_max || "",
                  rate: values.rate || "",
                },
              ],
              applicationDeadline: values.applicationDeadline,
            },
          ],
          job_specifications: [
            {
              jobDescription: values.jobDescription,
              // requiredSkills: Array.isArray(values.requiredSkills)
              //   ? values.requiredSkills
              //   : [values.requiredSkills],
              requiredSkill: Array.isArray(values.requiredSkills)
                ? values.requiredSkills
                : htmlToArray(values.requiredSkills),
            },
          ],
          benefits: values.benefits,
        };

        // Try submitting the job to the API
        try {
          await postActiveJob(payload)
            .unwrap()
            .then(() => {
              sendEvents({
                eventName: "Post Job",
                customData: {
                  email: payload.job_title ?? "",
                  action: "job post",
                },
              });
            });

          // setCurrentView("overview");
        } catch (error) {
          console.error("Error submitting job:", error);
        }
      } else {
        console.error("Missing required fields:", values);
      }
    }
  };

  // Save Job To draft Handler
  const handleSaveToDraft = async (
    values: z.infer<
      | typeof jobTitleSchema
      | typeof jobDetailsSchema
      | typeof jobSpecificationSchema
      | typeof benefitDetailsSchema
    >
  ) => {
    if (currentView === "createJob") {
      setCurrentView("editJob");
    } else if (currentTab === "details") {
      handleNextTab();
    } else if (currentTab === "specification") {
      handleNextTab();
    } else if (currentTab === "benefit" && currentView !== "jobPreview") {
      setCurrentView("jobPreview");
    } else {
      if (
        "experienceLevel" in values &&
        "workPattern" in values &&
        "jobDescription" in values &&
        "benefits" in values
      ) {
        const payload = {
          job_title: values.job_title,
          job_details: [
            {
              experienceLevel: values.experienceLevel,
              workPattern: values.workPattern,
              employmentType: values.employmentType,
              salaryRange: [
                {
                  currency_code: values.currency_code || "",
                  salary_min: values.salary_min || "",
                  salary_max: values.salary_max || "",
                  rate: values.rate || "",
                },
              ],
              applicationDeadline: values.applicationDeadline,
            },
          ],
          job_specifications: [
            {
              jobDescription: values.jobDescription,
              requiredSkill: Array.isArray(values.requiredSkills)
                ? values.requiredSkills
                : htmlToArray(values.requiredSkills),
            },
          ],
          benefits: values.benefits,
        };

        // Try submitting the job to the API
        try {
          await saveJobToDraft(payload)
            .unwrap()
            .then(() => {
              sendEvents({
                eventName: "Post Job Draft",
                customData: {
                  email: payload.job_title ?? "",
                  action: "draft post",
                },
              });
            });

          setCurrentView("overview");
        } catch (error) {
          console.error("Error submitting job:", error);
        }
      } else {
        console.error("Missing required fields:", values);
      }
    }
  };

  // write with AI Job Description
  const jobTitle = watch("job_title");
  const [jobDescriptionAI, { isLoading: loadingDesAI }] =
    useJobDescriptionAIMutation();
  const [showRewrite, setShowRewrite] = useState(false);

  const handleWriteWithAIDescription = async () => {
    if (!jobTitle) {
      ToastNotification({
        title: "Empty Job Title",
        description: "Please provide a job title first.",
        type: "error",
      });
      return;
    }

    const payload = { job_title: jobTitle };

    try {
      setShowRewrite(false);
      const response = await jobDescriptionAI(payload).unwrap();
      if (response) {
        setValue("jobDescription", response.data);
        setShowRewrite(true);
      }
    } catch (error) {
      console.error("Error generating job description:", error);
    }
  };

  // Handle Rewrite Job Description
  const [jobDescriptionAIRewite, { isLoading: loadingDesAIRewrite }] =
    useJobDescriptionAIRewiteMutation();

  const handleWriteWithAIDescriptionRewrite = async () => {
    if (!jobTitle) {
      ToastNotification({
        title: "Empty Job Title",
        description: "Please provide a job title first.",
        type: "error",
      });
      return;
    }

    const payload = { job_title: jobTitle };

    try {
      const response = await jobDescriptionAIRewite(payload).unwrap();
      if (response) {
        setValue("jobDescription", response.data);
        setShowRewrite(true);
      }
    } catch (error) {
      console.error("Error generating job description:", error);
    }
  };

  // Handle Required Skill
  const [requiredSkill, { data: skillData, isLoading: loadingSkill }] =
    useRequiredSkillMutation();

  /**
   * Memoized function to fetch skills based on jobTitle.
   * It only gets recreated if jobTitle or requiredSkill changes.
   **/
  const fetchSkill = useCallback(async () => {
    if (!jobTitle) return;

    const payload = { job_title: jobTitle };

    try {
      await requiredSkill(payload).unwrap();
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  }, [jobTitle, requiredSkill]);

  useEffect(() => {
    if (currentTab === "specification" && jobTitle) {
      fetchSkill();
    }
  }, [currentTab, jobTitle, fetchSkill]);

  const skills = Array.isArray(skillData?.data) ? skillData.data : [];

  // Handle Benefit Details write with AI
  const [showBenefitRewrite, setShowBenefitRewrite] = useState(false);
  const [benefitDetailWriteAI, { isLoading: loadingBenefitAI }] =
    useBenefitDetailWriteAIMutation();

  const handleWriteWithAIBenefit = async () => {
    if (!jobTitle) {
      ToastNotification({
        title: "Empty Job Title",
        description: "Please provide a job title first.",
        type: "error",
      });
      return;
    }

    const payload = { job_title: jobTitle };

    try {
      setShowBenefitRewrite(false);
      const response = await benefitDetailWriteAI(payload).unwrap();
      if (response) {
        setValue("benefits", response.data);
        setShowBenefitRewrite(true);
      }
    } catch (error) {
      console.error("Error generating job description:", error);
    }
  };

  // Handle Benefit Details  Rewrite with AI
  const [benefitDetailReWriteAI, { isLoading: loadingBenefitRewrite }] =
    useBenefitDetailReWriteAIMutation();

  const handleReWriteWithAIBenefit = async () => {
    if (!jobTitle) {
      ToastNotification({
        title: "Empty Job Title",
        description: "Please provide a job title first.",
        type: "error",
      });
      return;
    }

    const payload = { job_title: jobTitle };

    try {
      const response = await benefitDetailReWriteAI(payload).unwrap();
      if (response) {
        setValue("benefits", response.data);
        // setShowBenefitRewrite(true);
      }
    } catch (error) {
      console.error("Error generating job description:", error);
    }
  };

  // formater for comma to show after typing amount
  const formatCurrency = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    // Remove non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = formatCurrency(numericValue);
    setValue(formattedValue);
  };

  //  draft edit control
  // 1. get the data
  const [draftId, setDraftId] = useState("");
  const { data: draftEditdata, isLoading: draftEditLoader } =
    useGetJobsInDraftQuery(draftId, {skip: !draftId});


    console.log("draftEditdata", draftEditdata)

  // 2. Update the data
  // Save Job To draft Handler
  const [updateJobInDraft, { isLoading: updateDraftLoading }] =
    useUpdateJobInDraftMutation();

  const handleUpdateDraft = async (
    values: z.infer<
      | typeof jobTitleSchema
      | typeof jobDetailsSchema
      | typeof jobSpecificationSchema
      | typeof benefitDetailsSchema
    >
  ) => {
    if (currentView === "createJob") {
      setCurrentView("editJob");
    } else if (currentTab === "details") {
      handleNextTab();
    } else if (currentTab === "specification") {
      handleNextTab();
    } else if (currentTab === "benefit" && currentView !== "jobPreview") {
      setCurrentView("jobPreview");
    } else {
      if (
        "experienceLevel" in values &&
        "workPattern" in values &&
        "jobDescription" in values &&
        "benefits" in values
      ) {
        const payload = {
          job_title: values.job_title,
          job_details: [
            {
              experienceLevel: values.experienceLevel,
              workPattern: values.workPattern,
              employmentType: values.employmentType,
              salaryRange: [
                {
                  currency_code: values.currency_code || "",
                  salary_min: values.salary_min || "",
                  salary_max: values.salary_max || "",
                  rate: values.rate || "",
                },
              ],
              applicationDeadline: values.applicationDeadline,
            },
          ],
          job_specifications: [
            {
              jobDescription: values.jobDescription,
              requiredSkills: Array.isArray(values.requiredSkills)
                ? values.requiredSkills
                : [values.requiredSkills],
            },
          ],
          benefits: values.benefits,
        };

        // Try submitting the job to the API
        try {
          await updateJobInDraft({ id: draftId, data: payload }).unwrap();

          setCurrentView("overview");
        } catch (error) {
          console.error("Error submitting job:", error);
        }
      } else {
        console.error("Missing required fields:", values);
      }
    }
  };

  // setter to put the data from the api into the form so user can update draft
  useEffect(() => {
    if (draftEditdata?.data?.job_title) {
      methods.setValue("job_title", draftEditdata?.data?.job_title);
      methods.setValue(
        "workPattern",
        draftEditdata?.data?.job_details?.[0]?.workPattern
      );
      methods.setValue(
        "employmentType",
        draftEditdata?.data?.job_details?.[0]?.employmentType
      );
      methods.setValue(
        "applicationDeadline",
        draftEditdata?.data?.job_details?.[0]?.applicationDeadline
      );
      methods.setValue(
        "experienceLevel",
        draftEditdata?.data?.job_details?.[0]?.experienceLevel
      );
      methods.setValue(
        "salary_min",
        draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]?.salary_min
      );
      methods.setValue(
        "salary_max",
        draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]?.salary_max
      );
      methods.setValue(
        "currency_code",
        draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]?.currency_code
      );
      methods.setValue(
        "rate",
        draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]?.rate
      );
      methods.setValue("benefits", draftEditdata?.data?.benefits);

      const jobDescrip =
        draftEditdata?.data?.job_specifications?.[0]?.jobDescription;
      const newJobDesc =
        /<ul>[\s\S]*<\/ul>/.test(jobDescrip) &&
        /<li>[\s\S]*<\/li>/.test(jobDescrip)
          ? jobDescrip
          : formatTextToHtml(jobDescrip);

      methods.setValue("jobDescription", newJobDesc);
      methods.setValue(
        "requiredSkills",
        arrayToHtml(
          draftEditdata?.data?.job_specifications?.[0]?.requiredSkills
        )
      );
    }
  }, [draftEditdata, methods]);







  // 1.Update Active Job 
  const [activeJobId, setActiveJobId] = useState("")
  const { data: singleActiveJob, error, isLoading } = useGetSingleActiveJobQuery(activeJobId, {
    skip: !activeJobId,
  });






  console.log("singleActiveJob", singleActiveJob)


  const renderView = () => {
    switch (currentView) {
      case "jobAds":
        return (
          <>
            {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
              <Jobbox
                title="My Job Post"
                description="Update or refine your job ad to attract top talent!"
                titleVariant="text-[15px] lg:text-[22px]"
                descriptionVariant="text-[12px] lg:text-sm"
              />
              <Button
                text="Create a Job Post"
                variant="bg-main-600 text-white rounded-full  w-[200px] flex justify-center items-center gap-1"
                imgIcon={
                  <CirclePlus
                    color="#0061F9"
                    size={20}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "50%",
                    }}
                  />
                }
                clickFn={() => setCurrentView("createJob")}
              />
            </div>

            
            <div className="flex flex-col items-center justify-center gap-5 mt-28 lg:mt-32 px-4">
              <div className="w-full flex items-center justify-center">
                <Image
                  src={CreateJobs}
                  alt="create-job"
                  className="w-28 lg:w-36"
                />
              </div>
              <Jobbox
                title="No Job ad has been created"
                description="Click the button below to create your first job post"
                variant="text-center"
                titleVariant="text-[15px] lg:text-[22px]"
                descriptionVariant="text-[12px] lg:text-sm"
              />
              <Button
                text="Create a Job Post"
                variant="bg-main-600 text-white rounded-lg p-4 w-full md:w-[200px] flex justify-center items-center gap-1"
                clickFn={() => setCurrentView("createJob")}
              />
            </div> */}
          </>
        );

      case "createJob":
        return (
          <>
            {/* Content for Create Job View */}
            <div className="flex flex-col items-center justify-center gap-5 mt-10">
              <Image src={AvaterJobs} alt="avater-job" />
              <Jobbox
                description="Let's start crafting the perfect job ad! Start by entering the job title below."
                variant="text-center lg:w-[350px]"
              />

              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={methods.control}
                    name="job_title"
                    label={
                      <span>
                        Job Title <span className="text-red-600">*</span>
                      </span>
                    }
                    placeholder="Product Manager"
                    variant="h-[40px] w-[300px] lg:w-[350px]"
                  />

                  <div className="flex gap-2 justify-end items-center">
                    <Button
                      variant="outlined"
                      onClick={() => setCurrentView("overview")}
                      className="w-full sm:w-[120px] border-main-600 text-main-600 h-11"
                    >
                      Previous
                    </Button>
                    <SubmitButton className="w-full sm:w-[120px] h-11">
                      Next
                    </SubmitButton>
                  </div>
                </form>
              </FormProvider>
            </div>
          </>
        );

      case "editJob":
        return (
          <div className="w-full lg:w-[90%]">
            <Jobbox title="Edit Job Post" variant="mb-4 text-[20px]" />
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full flex flex-col items-start"
            >
              <TabsList className="max-md:w-full flex flex-wrap gap-2 mb-4 lg:mr-11">
                <TabsTrigger
                  value="details"
                  className="flex items-center justify-center w-full md:w-auto py-2 rounded bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                >
                  <CalendarClock size={16} className="mr-2" />
                  Job Details
                </TabsTrigger>
                <TabsTrigger
                  value="specification"
                  className="flex items-center justify-center w-full md:w-auto py-2 rounded bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                >
                  <Briefcase size={16} className="mr-2" />
                  Job Specification
                </TabsTrigger>
                <TabsTrigger
                  value="benefit"
                  className="flex items-center justify-center w-full md:w-auto px-4 py-2 rounded bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                >
                  <Gift size={16} className="mr-2" />
                  Benefit
                </TabsTrigger>
              </TabsList>

              <div className="mt-24 md:mt-2 relative">
                <TabsContent value="details">
                  <Jobpointer
                    title="Job Details pointers"
                    descOne="Avoid underqualified or overqualified applicants by selecting the appropriate experience level"
                    descTwo="Use a competitive salary range to attract strong candidates"
                    descThree="Set a realistic application deadline to balance timely and quality applications"
                  />

                  <div className="mt-6 bg-white p-4 rounded-lg w-full">
                    <Jobbox
                      title="Job Details"
                      description="Provide details about the job you are posting to attract the right candidates."
                      variant="mb-5 w-full "
                      descriptionVariant="text-sm"
                    />

                    <FormProvider {...methods}>
                      <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row">
                          <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            name="experienceLevel"
                            label={
                              <span>
                                Experience Level{" "}
                                <span className="text-red-600">*</span>
                              </span>
                            }
                            placeholder="Enter Experience Level"
                            variant="h-[40px] w-full"
                            defaultValue=""
                          >
                            {ExperienceLevel.map((level, index) => (
                              <SelectItem
                                key={`${level}-${index}`}
                                value={level}
                              >
                                {level}
                              </SelectItem>
                            ))}
                          </CustomFormField>

                          <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            name="workPattern"
                            label={
                              <span>
                                Work pattern{" "}
                                <span className="text-red-600">*</span>
                              </span>
                            }
                            placeholder="Enter Work pattern"
                            variant="h-[40px] w-full"
                            defaultValue=""
                          >
                            {WorkPattern.map((pattern, index) => (
                              <SelectItem
                                key={`${pattern}-${index}`}
                                value={pattern}
                              >
                                {pattern}
                              </SelectItem>
                            ))}
                          </CustomFormField>
                        </div>

                        <div>
                          <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            name="employmentType"
                            label={
                              <span>
                                Employment Type{" "}
                                <span className="text-red-600">*</span>
                              </span>
                            }
                            placeholder="Enter Employment Type"
                            variant="h-[40px] w-full"
                            defaultValue=""
                          >
                            {EmploymentType.map((employtype, index) => (
                              <SelectItem
                                key={`${employtype}-${index}`}
                                value={employtype}
                              >
                                {employtype}
                              </SelectItem>
                            ))}
                          </CustomFormField>
                        </div>

                        <div className="flex flex-col gap-5 sm:flex-row">
                          <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            name="currency_code"
                            label={
                              <span>
                                Salary Currency{" "}
                                <span className="text-red-600">*</span>
                              </span>
                            }
                            placeholder="Currency"
                            variant="h-[40px] w-full sm:w-40"
                            defaultValue=""
                          >
                            {SalaryRange.map((range, index) => (
                              <SelectItem
                                key={`${range}-${index}`}
                                value={range}
                              >
                                {range}
                              </SelectItem>
                            ))}
                          </CustomFormField>
                          <div className="flex flex-col gap-5 sm:flex-row w-full">
                            <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={methods.control}
                              name="salary_min"
                              label="Min"
                              placeholder="Enter your Minimum Currency"
                              variant="h-[40px] w-full"
                              type="text"
                              onChange={(e) =>
                                handleCurrencyChange(e, (value) =>
                                  methods.setValue("salary_min", value)
                                )
                              }
                            />
                            <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={methods.control}
                              name="salary_max"
                              label="Max"
                              placeholder="Enter your Maximum Currency"
                              variant="h-[40px] w-full"
                              type="text"
                              onChange={(e) =>
                                handleCurrencyChange(e, (value) =>
                                  methods.setValue("salary_max", value)
                                )
                              }
                            />
                            {/* old without comma  */}
                            {/* <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={methods.control}
                              name="salary_min"
                              label="Min"
                              placeholder="Enter your Minimum Currency"
                              variant="h-[40px] w-full"
                              type="number"
                            />
                            <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={methods.control}
                              name="salary_max"
                              label="Max"
                              placeholder="Enter your Maximum Currency"
                              variant="h-[40px] w-full"
                              type="number"
                            /> */}
                          </div>

                          <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            name="rate"
                            label="Salary Frequency"
                            placeholder="Select Frequency"
                            variant="h-[40px] w-full sm:w-40"
                            defaultValue=""
                          >
                            {["Yearly", "Quarterly", "Monthly"].map(
                              (rate, index) => (
                                <SelectItem
                                  key={`${rate}-${index}`}
                                  value={rate}
                                >
                                  {rate}
                                </SelectItem>
                              )
                            )}
                          </CustomFormField>
                        </div>

                        <CustomFormField
                          fieldType={FormFieldType.DATE}
                          control={control}
                          name="applicationDeadline"
                          label={
                            <span>
                              Application Deadline{" "}
                              <span className="text-red-600">*</span>
                            </span>
                          }
                          placeholder="Select a date"
                          variant="w-full h-[40px] border border-main-500 text-sm shadow-sm rounded"
                          dateFormat="PPP"
                        />

                        <div className="flex gap-2 justify-end items-center mt-6">
                          <Button
                            variant="outlined"
                            onClick={() => setCurrentView("createJob")}
                            className="w-full sm:w-[120px] border-main-600 text-main-600 h-11"
                          >
                            Previous
                          </Button>
                          <SubmitButton className="w-full sm:w-[120px] h-11">
                            Next
                          </SubmitButton>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                </TabsContent>
                <TabsContent value="specification">
                  <Jobpointer
                    title="Job Specification pointers"
                    descOne="Define your ideal candidate by carefully selecting the most important and relevant skills that align with the role’s requirements."
                    descTwo="Write a clear, concise job description highlighting key responsibilities."
                    descThree="Click Rewrite with AI to refine your existing job description for clarity."
                  />
                  <div className="mt-6 bg-white p-4 rounded-lg">
                    <Jobbox
                      title="Job Description"
                      description="Outline the main responsibilities and expectations to attract qualified candidates for this role."
                      variant="mb-2 "
                      descriptionVariant="text-sm"
                    />
                    <div className="mt-4 mb-4">
                      <Tabs defaultValue="account" className="">
                        <TabsList className="flex  items-center justify-end w-full gap-4  lg:mr-11">
                          {!showRewrite && (
                            <TabsTrigger
                              value="hh"
                              className="flex items-center justify-center w-full md:w-auto py-2 px-4 rounded-full bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                              onClick={handleWriteWithAIDescription}
                              disabled={loadingDesAI}
                            >
                              {loadingDesAI ? (
                                <span>Loading...</span>
                              ) : (
                                <>
                                  <Sun size={16} className="mr-2" />
                                  Write with AI
                                </>
                              )}
                            </TabsTrigger>
                          )}

                          {showRewrite && (
                            <TabsTrigger
                              value="jjjjj"
                              className="flex items-center justify-center w-full md:w-auto py-2 px-6 rounded-full bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                              onClick={handleWriteWithAIDescriptionRewrite}
                              disabled={loadingDesAIRewrite}
                            >
                              {loadingDesAIRewrite ? (
                                <span>Loading...</span>
                              ) : (
                                <>
                                  <Pencil size={16} className="mr-2" />
                                  Rewrite
                                </>
                              )}
                            </TabsTrigger>
                          )}
                        </TabsList>
                      </Tabs>
                    </div>
                    <FormProvider {...methods}>
                      <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="w-full hidden">
                          <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={methods.control}
                            name="jobDescription"
                            label={
                              <span>
                                Job Description{" "}
                                <span className="text-red-600">*</span>
                              </span>
                            }
                            placeholder="Do you have a JD? Paste it here. If not, feel free to write one with AI. separate description with a comma"
                            variant="h-40 w-full"
                          />
                        </div>

                        <div className="w-full flex flex-col gap-[.5em]">
                          <span>
                            Job Description{" "}
                            <span className="text-red-600">*</span>
                          </span>
                          <TextEditor
                            name="jobDescription"
                            value={methods.getValues("jobDescription")}
                            onChange={(name: string, value: string) => {
                              setValue("jobDescription", value);
                            }}
                            toolbarCtrl={["bold", "bulletedList"]}
                            context={""}
                            section={""}
                          />
                        </div>

                        <div className="w-full flex flex-col gap-[.5em]">
                          <span>
                            Requirements <span className="text-red-600">*</span>
                          </span>
                          <TextEditor
                            name="requiredSkills"
                            value={methods.getValues("requiredSkills")}
                            onChange={(name: string, value: string) => {
                              setValue("requiredSkills", value);
                            }}
                            toolbarCtrl={["bulletedList"]}
                            context={""}
                            section={""}
                          />
                        </div>

                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={methods.control}
                          name="requiredSkills"
                          label={
                            <span>
                              Required Skills{" "}
                              <span className="text-red-600">*</span>
                            </span>
                          }
                          placeholder="Skill required for the job you want to post."
                          variant="h-40 w-full hidden"
                        />

                        <div className="flex flex-wrap gap-2 bg-[#F7FCFF] border border-[#D4EBFc] rounded-lg py-10 px-4">
                          <div className="w-full mb-2">
                            <p>
                              Here are suggested skills based on the job title.
                              Select those that fit your ideal candidate.
                            </p>
                          </div>

                          {loadingSkill ? (
                            <p>Loading skills...</p>
                          ) : skills.length > 0 ? (
                            skills
                              .filter((skill: string) => {
                                const requiredSkills =
                                  methods.getValues("requiredSkills") || "";
                                return !requiredSkills.includes(
                                  skill as unknown as string
                                );
                              })
                              .map((skill: string) => (
                                <p
                                  key={skill}
                                  className="border text-sm hover:bg-main-600  hover:text-white border-bankGradient rounded-full px-2 py-1 cursor-pointer"
                                  onClick={() => handleOptionClick(skill)}
                                >
                                  {skill}
                                </p>
                              ))
                          ) : (
                            <p>No skills available</p>
                          )}
                        </div>

                        <div className="flex gap-2 justify-end items-center">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setCurrentTab("details");
                              setCurrentView("editJob");
                            }}
                            className="w-full sm:w-[120px] border-main-600 text-main-600 h-11"
                          >
                            Previous
                          </Button>
                          <SubmitButton className="w-full sm:w-[120px] h-11">
                            Next
                          </SubmitButton>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                </TabsContent>
                <TabsContent value="benefit">
                  <Jobpointer
                    title="Benefit pointers"
                    descOne="Highlight key benefits that support employee well-being while fostering opportunities for career growth and development."
                    descTwo="Include specifics like health insurance, flexible hours, or bonuses."
                    descThree="Focus on benefits that match the job’s level and expectations."
                  />

                  <div className="mt-6 bg-white p-4 rounded-lg">
                    <Jobbox
                      title="Benefit Details"
                      description="Highlight a range of benefits designed to support employee"
                      variant="mb-2 "
                      descriptionVariant="text-sm"
                    />
                    <div className="mt-4 mb-4">
                      <Tabs defaultValue="account" className="">
                        <TabsList className="flex  items-center justify-end w-full gap-4  lg:mr-11">
                          {!showBenefitRewrite && (
                            <TabsTrigger
                              value="hh"
                              className="flex items-center justify-center w-full md:w-auto py-2 px-4 rounded-full bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                              onClick={handleWriteWithAIBenefit}
                              disabled={loadingBenefitAI}
                            >
                              {loadingBenefitAI ? (
                                <span>Loading...</span>
                              ) : (
                                <>
                                  <Sun size={16} className="mr-2" />
                                  Write with AI
                                </>
                              )}
                            </TabsTrigger>
                          )}

                          {showBenefitRewrite && (
                            <TabsTrigger
                              value="jjjjj"
                              className="flex items-center justify-center w-full md:w-auto py-2 px-6 rounded-full bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                              onClick={handleReWriteWithAIBenefit}
                              disabled={loadingBenefitRewrite}
                            >
                              {loadingBenefitRewrite ? (
                                <span>Loading...</span>
                              ) : (
                                <>
                                  <Pencil size={16} className="mr-2" />
                                  Rewrite
                                </>
                              )}
                            </TabsTrigger>
                          )}
                        </TabsList>
                      </Tabs>
                    </div>
                    <FormProvider {...methods}>
                      <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={methods.control}
                          name="benefits"
                          label="Benefit Details"
                          placeholder="Do you have a JD? Paste it here. If not, feel free to write one with AI."
                          variant="h-40 w-full hidden"
                        />

                        <div className="w-full flex flex-col gap-[.5em]">
                          <span>
                            Benefit <span className="text-red-600">*</span>
                          </span>
                          <TextEditor
                            name="benefits"
                            value={methods.getValues("benefits")}
                            onChange={(name: string, value: string) => {
                              setValue("benefits", value);
                            }}
                            toolbarCtrl={["bold", "bulletedList"]}
                            context={""}
                            section={""}
                          />
                        </div>

                        <div className="flex gap-2 justify-end items-center">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setCurrentTab("specification");
                              setCurrentView("editJob");
                            }}
                            className="w-full sm:w-[120px] border-main-600 text-main-600 h-11"
                          >
                            Previous
                          </Button>
                          <SubmitButton className="w-full sm:w-[120px] h-11">
                            Next
                          </SubmitButton>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        );

      case "jobPreview":
        const formData = watch() as {
          job_title: string;
          experienceLevel: string;
          workPattern: string;
          employmentType: string;
          currency_code: string;
          salary_min: string;
          salary_max: string;
          rate: string;
          applicationDeadline: string;
          jobDescription: string;
          requiredSkills: string;
          benefits: string;
        };

        return (
          <div className="">
            <Jobbox title="Preview" variant="mb-2 text-[20px]" />
            {draftEditLoader ? (
              <div>
                <DratfEditSkeleton />
              </div>
            ) : (
              // Actual content once data is loaded
              <div className="bg-white rounded-md p-4">
                <Jobbox
                  title={
                    formData.job_title ||
                    draftEditdata?.data?.job_title || singleActiveJob?.data?.job_title ||
                    "Untitled"
                  }
                  variant="mb-4 text-[26px] capitalize"
                  onEdit={() => setCurrentView("createJob")}
                />
                <div className="w-full flex flex-wrap gap-[1em]">
                  <PreviewCard
                    imgUrl={Company}
                    text={userInfo?.data?.company_name || "Not Specified"}
                    addOn="bg-neutral-200 text-neutral-600 px-[1em] py-[.85em] capitalize rounded-[.65em] hover:bg-main-600  hover:text-white group "
                  />
                  <PreviewCard
                    imgUrl={Location}
                    text={
                      formData.workPattern ||
                      draftEditdata?.data?.job_details?.[0]?.workPattern || 
                      singleActiveJob?.data?.job_details?.[0]?.workPattern || 
                      "Not Specified"
                    }
                    addOn="bg-orange-200 text-orange-800 px-[1em] py-[.85em] capitalize rounded-[.65em] hover:bg-main-600  hover:text-white group"
                  />
                  <PreviewCard
                    imgUrl={Years}
                    text={`${
                      formData.experienceLevel ||
                      draftEditdata?.data?.job_details?.[0]?.experienceLevel || 
                      singleActiveJob?.data?.job_details?.[0]?.experienceLevel ||
                      "N/A"
                    } years`}
                    addOn="bg-yellow-200 text-yellow-800 px-[1em] py-[.85em] capitalize rounded-[.65em] hover:bg-main-600  hover:text-white group"
                  />

                  <PreviewCard
                    imgUrl={Amount}
                    text={`${
                      formData.salary_min ||
                      draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]?.salary_min || singleActiveJob?.data?.job_details?.[0]?.salaryRange?.[0]?.salary_min ||
                      "N/A"
                    } - ${
                      formData.salary_max ||
                      draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]
                        ?.salary_max ||
                      "N/A"
                    } ${
                      formData.currency_code ||
                      draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]
                        ?.currency_code ||
                      ""
                    }  ${
                      formData.rate ||
                      draftEditdata?.data?.job_details?.[0]?.salaryRange?.[0]
                        ?.rate ||
                      ""
                    }`}
                    onEdit={() => {
                      setCurrentTab("details");
                      setCurrentView("editJob");
                    }}
                    addOn="bg-green-200 text-green-800 px-[1em] py-[.85em] capitalize rounded-[.65em] hover:bg-main-600  hover:text-white group"
                  />
                </div>

                <div className="mt-1">
                  <PreviewCard
                    imgUrl={Years}
                    text={`${
                      formData.employmentType ||
                      draftEditdata?.data?.job_details?.[0]?.employmentType ||
                      "N/A"
                    }`}
                    addOn="bg-blue-200 text-blue-800 px-[1em] py-[.85em] capitalize rounded-[.65em] hover:bg-main-600  hover:text-white group"
                  />
                </div>
                <hr className="mt-2" />

                <div className="mt-4">
                  <JobDescription
                    title="About the company"
                    description={userInfo?.data?.company_bio || "Not Specified"}
                  />
                </div>
                <div className="mt-4">
                  <JobDescription
                    title="Job Description"
                    description={
                      formData.jobDescription ||
                      draftEditdata?.data?.job_specifications?.[0]
                        ?.jobDescription ||
                      "Not Specified"
                    }
                    onEdit={() => {
                      setCurrentTab("specification");
                      setCurrentView("editJob");
                    }}
                  />
                </div>

                <div className="mt-4">
                  <JobDescription
                    title="Requirements"
                    description={
                      formData.requiredSkills ||
                      arrayToHtml(

                        
                        draftEditdata?.data?.job_specifications?.[0]?.requiredSkills?.join(
                          ", "
                        )
                      ) ||
                      "Not Specified"
                    }
                    onEdit={() => {
                      setCurrentTab("specification");
                      setCurrentView("editJob");
                    }}
                  />
                </div>

                <div className="mt-4">
                  <JobDescription
                    title="What We Offer"
                    description={
                      formData.benefits ||
                      draftEditdata?.data?.benefits ||
                      "Not Specified"
                    }
                    onEdit={() => {
                      setCurrentTab("benefit");
                      setCurrentView("editJob");
                    }}
                  />
                </div>
              </div>
            )}
            <div className="flex gap-5 justify-end mt-4">
              {draftId ? (
                <div className="flex gap-5">
                  <SubmitButton
                    className="w-full sm:w-[120px] h-11 bg-gray-500"
                    isLoading={updateDraftLoading}
                    clickFn={methods.handleSubmit(handleUpdateDraft)}
                  >
                    Update Draft
                  </SubmitButton>
                  <SubmitButton
                    className="w-full sm:w-[120px] h-11"
                    isLoading={postLoading}
                    clickFn={methods.handleSubmit(onSubmit)}
                  >
                    Post Job
                  </SubmitButton>
                </div>
              ) : (
                <div className="flex gap-5">
                  <SubmitButton
                    className="w-full sm:w-[120px] h-11 bg-gray-500"
                    isLoading={draftLoading}
                    clickFn={methods.handleSubmit(handleSaveToDraft)}
                  >
                    Save To Draft
                  </SubmitButton>
                  <SubmitButton
                    className="w-full sm:w-[120px] h-11"
                    isLoading={postLoading}
                    clickFn={methods.handleSubmit(onSubmit)}
                  >
                    Post Job
                  </SubmitButton>
                </div>
              )}
            </div>
          </div>
        );

      case "overview":
        return (
          <JobOverview
            setCurrentView={setCurrentView}
            setDraftId={setDraftId}
            setActiveJobId={setActiveJobId}
          />
        );

      default:
        return <div>Invalid View</div>;
    }
  };

  const continueToOvw = () => {
    dispatch(setCurrJobPost({ showJobSuccess: false, postId: "" }));
    setCurrentView("overview");
  };

  return (
    <section>
      <MainModal
        visible={showJobSuccess}
        close={continueToOvw}
        closable={false}
      >
        <JobPostSuccess showSuccess={true} clickFn={continueToOvw} />
      </MainModal>

      {renderView()}
    </section>
  );
};

export default JobPosting;
