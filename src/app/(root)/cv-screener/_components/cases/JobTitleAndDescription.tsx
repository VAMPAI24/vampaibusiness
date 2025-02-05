"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField";
import { Sun, Pencil } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import ToastNotification from "@/components/shared/ToastNotification";
import {
  useJobDescriptionAIMutation,
  useJobDescriptionAIRewiteMutation,
} from "@/redux/features/job-posting/jobpostingApi";
import { Control, UseFormSetValue, UseFormHandleSubmit } from "react-hook-form";
import { titleanddesCVScreenerschema } from "@/lib/schemas";



interface JobTitleAndDescriptionProps {
  control: Control<z.infer<typeof titleanddesCVScreenerschema>>;
  setValue: UseFormSetValue<z.infer<typeof titleanddesCVScreenerschema>>;
  handleSubmit: UseFormHandleSubmit<z.infer<typeof titleanddesCVScreenerschema>>;
  onSubmit: (data: z.infer<typeof titleanddesCVScreenerschema>) => void;
  jobTitle: string;
}

const JobTitleAndDescription = ({
  control,
  setValue,
  handleSubmit,
  onSubmit,
  jobTitle,
}: JobTitleAndDescriptionProps) => {
  const [showRewrite, setShowRewrite] = useState(false);

  const [jobDescriptionAI, { isLoading: loadingDesAI }] =
    useJobDescriptionAIMutation();
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
      const response = await jobDescriptionAIRewrite({
        job_title: jobTitle,
      }).unwrap();
      if (response) {
        setValue("jobDescription", response.data); 
      }
    } catch (error) {
      console.error("Error generating job description:", error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-5 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-full lg:w-[350px]">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="job_title"
            label="Job Title"
            placeholder="Product Manager"
            variant="h-[40px] w-full lg:w-[350px]"
          />
        </div>

        {/* AI and Job Description */}
        <div className="mt-6 rounded-lg w-full lg:w-[600px]">
          <Tabs>
            <TabsList className="flex items-center justify-end w-full gap-4 lg:mr-11">
              {!showRewrite && (
                <TabsTrigger
                  value={""}
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
            label="Paste your job description in the box below"
            placeholder="Write or generate a job description here."
            variant="h-40 w-full resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center">
          <SubmitButton className="w-full sm:w-[120px] h-11">Next</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default JobTitleAndDescription;
