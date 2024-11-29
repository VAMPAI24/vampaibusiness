"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Jobbox from "@/components/jobboard/Jobbox";
import { Button } from "@/components/landingpage";
import {
  Briefcase,
  CirclePlus,
  CalendarClock,
  Gift,
  Sun,
  Pencil,
} from "lucide-react";
import CreateJobs from "@/public/svgs/Jobs/create-jobs.svg";
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
  
  useJobDescriptionAIMutation,
  useJobDescriptionAIRewiteMutation,
  usePostActiveJobMutation,
  useRequiredSkillMutation,
  useSaveJobToDraftMutation,
} from "@/redux/features/job-posting/jobpostingApi";
import ToastNotification from "@/components/shared/ToastNotification";
import JobOverview from "@/components/jobboard/JobOverview";
import Cookies from "js-cookie";

const JobPosting = () => {
  const [currentView, setCurrentView] = useState("jobAds");
  const [currentTab, setCurrentTab] = useState("details");

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
    const updatedSkills = currentSkills ? `${currentSkills}, ${skill}` : skill;
    setValue("requiredSkills", updatedSkills);
  };

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = Cookies.get("token"); 
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const { data: userInfo } = useGetSingleEmployerQuery(token);
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
                },
              ],
              applicationDeadline: values.applicationDeadline,
            },
          ],
          job_specifications: [
            {
              jobDescription: values.jobDescription,
              requiredSkills: values.requiredSkills,
            },
          ],
          benefits: values.benefits,
        };

        // Try submitting the job to the API
        try {
          
          await postActiveJob(payload).unwrap();
          
          setCurrentView("overview"); 
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
                },
              ],
              applicationDeadline: values.applicationDeadline,
            },
          ],
          job_specifications: [
            {
              jobDescription: values.jobDescription,
              requiredSkills: values.requiredSkills,
            },
          ],
          benefits: values.benefits,
        };

        // Try submitting the job to the API
        try {
          
          await saveJobToDraft(payload).unwrap();
          
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


    /**  useCallback is used to memoize the fetchSkill function so that it doesn't get recreated on every render unless its dependencies (jobTitle and requiredSkill) change.
   If jobTitle or requiredSkill changes, the function will be redefined, ensuring that the most recent values are used when calling fetchSkill. **/

    const fetchSkill = useCallback(async () => {
      const payload = { job_title: jobTitle };
    
      try {
        await requiredSkill(payload).unwrap();
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    }, [jobTitle, requiredSkill]); 
    


    useEffect(() => {
      fetchSkill();
    }, [fetchSkill]);


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


  const renderView = () => {
    switch (currentView) {
      case "jobAds":
        return (
          <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
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

            {/* Content Section */}
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
                description="Click the button below to create your first job ad"
                variant="text-center"
                titleVariant="text-[15px] lg:text-[22px]"
                descriptionVariant="text-[12px] lg:text-sm"
              />
              <Button
                text="Create a Job Post"
                variant="bg-main-600 text-white rounded-lg p-4 w-full md:w-[200px] flex justify-center items-center gap-1"
                clickFn={() => setCurrentView("createJob")}
              />
            </div>
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
                    label="Job Title"
                    placeholder="Product Manager"
                    variant="h-[40px] w-[300px] lg:w-[350px]"
                  />

                  <div className="flex justify-end items-center">
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
                            label="Experience Level"
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
                            label="Work pattern"
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
                            label="Employment Type"
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
                            label="Salary Range"
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
                            />
                          </div>
                        </div>

                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={methods.control}
                          name="applicationDeadline"
                          label="Application Deadline"
                          placeholder="DD/MM/YYYY"
                          variant="h-[40px] w-full"
                        />

                        <div className="flex justify-end items-center mt-6">
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
                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={methods.control}
                          name="jobDescription"
                          label="Job Description"
                          placeholder="Do you have a JD? Paste it here. If not, feel free to write one with AI. separate description with a comma"
                          variant="h-40 w-full"
                        />

                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={methods.control}
                          name="requiredSkills"
                          label="Required Skills"
                          placeholder="Skill required for the job you want to post."
                          variant="h-40 w-full"
                        />

                        <div className="flex flex-wrap gap-5 bg-[#F7FCFF] border border-[#D4EBFc] rounded-lg py-10 px-4">
                          <div className="w-full mb-2">
                            <p>
                              Here are suggested skills based on the job title.
                              Select those that fit your ideal candidate.
                            </p>
                          </div>

                          {loadingSkill ? (
                            <p>Loading skills...</p>
                          ) : skills.length > 0 ? (
                            skills.map((skill: string) => (
                              <p
                                key={skill}
                                className="border hover:bg-main-600 hover:text-white border-bankGradient rounded-full px-2 py-1 cursor-pointer"
                                onClick={() => handleOptionClick(skill)}
                              >
                                {skill}
                              </p>
                            ))
                          ) : (
                            <p>No skills available</p>
                          )}
                        </div>

                        <div className="flex justify-end items-center">
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
                          variant="h-40 w-full"
                        />

                        <div className="flex justify-end items-center">
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
          applicationDeadline: string;
          jobDescription: string;
          requiredSkills: string;
          benefits: string;
        };

        return (
          <div className="">
            <Jobbox title="Preview" variant="mb-4 text-[20px]" />
            <div className="bg-white rounded-md p-4">
              <Jobbox
                title={formData.job_title || "Untitled"}
                variant="mb-4 text-[26px] capitalize"
              />
              <div className="flex gap-5">
                <PreviewCard
                  imgUrl={Company}
                  text={formData.employmentType || "Not Specified"}
                />
                <PreviewCard
                  imgUrl={Location}
                  text={formData.workPattern || "Not Specified"}
                />
                <PreviewCard
                  imgUrl={Years}
                  text={`${formData.experienceLevel || "N/A"} years`}
                />
                <PreviewCard
                  imgUrl={Amount}
                  text={`${formData.salary_min || "N/A"} - ${
                    formData.salary_max || "N/A"
                  } ${formData.currency_code || ""}`}
                />
              </div>
              <hr className="mt-4" />

              <div className="mt-4">
                <JobDescription
                  title="About the company"
                  description={userInfo?.data?.company_bio || "Not Specified"}
                />
              </div>
              <div className="mt-4">
                <JobDescription
                  title="Job Description"
                  description={formData.jobDescription || "Not Specified"}
                />
              </div>

              <div className="mt-4">
              <JobDescription
                  title="Qualifications"
                  description={formData.requiredSkills || "Not Specified"}
                />
                
                
              </div>


              <div className="mt-4">
              <JobDescription
                  title="What We Offer"
                  description={formData.benefits || "Not Specified"}
                />
                
                
              </div>
            </div>
            <div className="flex gap-5 justify-end mt-4">
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
          </div>
        );

      case "overview":
        return (
          <JobOverview  setCurrentView={setCurrentView} />
        );

      default:
        return <div>Invalid View</div>;
    }
  };

  return <section>{renderView()}</section>;
};

export default JobPosting;
