"use client";

import React, { useState } from "react";
import CvHeaders from "./_components/cv-headers";
import SubmitButton from "@/components/shared/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Pencil } from "lucide-react";
import {
  useJobDescriptionAIMutation,
  useJobDescriptionAIRewiteMutation,
} from "@/redux/features/job-posting/jobpostingApi";
import ToastNotification from "@/components/shared/ToastNotification";

// Schema Definition
const jobTitleSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  jobDescription: z
    .string()
    .min(1, "Job description is required")
    .optional(), // Set to optional if `jobDescription` can initially be empty
});

const CvScreener = () => {
  const [currentScreener, setCurrentScreener] = useState("jobtitleanddescription");
  

  // Form Initialization
  const methods = useForm<z.infer<typeof jobTitleSchema>>({
    resolver: zodResolver(jobTitleSchema),
    defaultValues: {
      job_title: "",
      jobDescription: "",
    },
  });

  const { control, setValue, watch, handleSubmit } = methods;

  // Watch for form fields
  const jobTitle = watch("job_title");

  

  // Form Submission Handler
  const onSubmit = async (values: z.infer<typeof jobTitleSchema>) => {
    const payload = {
      job_title: values.job_title,
      jobDescription: values.jobDescription,
    };

    try {
      setCurrentScreener("uploadcv");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const [showRewrite, setShowRewrite] = useState(false);

  // AI Mutations
  const [jobDescriptionAI, { isLoading: loadingDesAI }] = useJobDescriptionAIMutation();
  const [jobDescriptionAIRewrite, { isLoading: loadingDesAIRewrite }] =
    useJobDescriptionAIRewiteMutation();

  // Generate Job Description with AI
  const handleWriteWithAIDescription = async () => {
    if (!jobTitle) {
      ToastNotification({
        title: "Empty Job Title",
        description: "Please provide a job title first.",
        type: "error",
      });
      return;
    }

    try {
      setShowRewrite(false);
      const response = await jobDescriptionAI({ job_title: jobTitle }).unwrap();
      if (response) {
        setValue("jobDescription", response.data); // Update `jobDescription`
        setShowRewrite(true);
      }
    } catch (error) {
      console.error("Error generating job description:", error);
    }
  };

  // Rewrite Job Description with AI
  const handleWriteWithAIDescriptionRewrite = async () => {
    if (!jobTitle) {
      ToastNotification({
        title: "Empty Job Title",
        description: "Please provide a job title first.",
        type: "error",
      });
      return;
    }

    try {
      const response = await jobDescriptionAIRewrite({ job_title: jobTitle }).unwrap();
      if (response) {
        setValue("jobDescription", response.data); // Update `jobDescription`
      }
    } catch (error) {
      console.error("Error generating job description:", error);
    }
  };

  // Render Screener Views
  const renderScreener = () => {
    switch (currentScreener) {
      case "jobtitleanddescription":
        return (
          <div className="flex flex-col items-start justify-start gap-5 mt-10">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="w-[300px] lg:w-[350px]">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name="job_title"
                  label="Job Title"
                  placeholder="Product Manager"
                  variant="h-[40px] w-[300px] lg:w-[350px]"
                />

                </div>
                

                {/* AI and Job Description */}
                <div className="mt-6 rounded-lg w-[600px]">
                  <Tabs>
                    <TabsList className="flex items-center justify-end w-full gap-4 lg:mr-11">
                      {!showRewrite && (
                        <TabsTrigger
                        value={""}
                          className="flex items-center justify-center w-full md:w-auto py-2 px-4 rounded-full bg-[#EAEBF1] hover:bg-blue-100 text-[#254E7D] data-[state=active]:bg-main-600 data-[state=active]:text-white"
                          onClick={handleWriteWithAIDescription}
                          disabled={loadingDesAI}                     >
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
                        value={""}
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

                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={control}
                    name="jobDescription"
                    label="Job Description"
                    placeholder="Write or generate a job description here."
                    variant="h-40 w-full"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end items-center">
                  <SubmitButton className="w-full sm:w-[120px] h-11">
                    Next
                  </SubmitButton>
                </div>
              </form>
            </FormProvider>
          </div>
        );

      case "uploadcv":
        return <h2 className="text-red-600">Upload CV</h2>;

      default:
        return <div>Invalid screener view</div>;
    }
  };

  return (
    <section>
      <CvHeaders title="CV Screener" description="Grade and evaluate candidate CVs" />
      {renderScreener()}
    </section>
  );
};

export default CvScreener;
