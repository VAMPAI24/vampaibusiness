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

// Define Schema
const jobTitleSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
});

const CvScreener = () => {
  const [currentScreener, setCurrentScreener] = useState(
    "jobtitleanddescription"
  );

  // Form methods with only `job_title`
  const methods = useForm<z.infer<typeof jobTitleSchema>>({
    resolver: zodResolver(jobTitleSchema),
    defaultValues: {
      job_title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof jobTitleSchema>) => {
    const payload = {
      job_title: values.job_title,
    };

    try {
      setCurrentScreener("uploadcv"); // Move to the next step
    } catch (error) {
      console.error("Error submitting job title:", error);
    }
  };

  // Render the screener
  const renderScreener = () => {
    switch (currentScreener) {
      case "jobtitleanddescription":
        return (
          <div>
            <div className="w-[300px] lg:w-[350px]">
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
                    variant="h-[40px] w-[350px]"
                  />

                  <div className="flex justify-end items-center">
                    <SubmitButton className="w-full sm:w-[120px] h-11">
                      Next
                    </SubmitButton>
                  </div>
                </form>
              </FormProvider>
            </div>
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
      <div>
        <CvHeaders
          title="CV Screener"
          description="Grade and evaluate candidate CVs"
        />
      </div>
      {renderScreener()}
    </section>
  );
};

export default CvScreener;
