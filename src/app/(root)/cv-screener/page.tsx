






"use client";

import React, { useState } from "react";
import CvHeaders from "./_components/cv-headers";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import JobTitleAndDescription from "./_components/cases/JobTitleAndDescription";
import UploadCV from "./_components/cases/UploadCV";
import { FileItem } from "@/types";
import { titleanddesCVScreenerschema, uploadCVScreenerSchema } from "@/lib/schemas";
import GradeAndEvaluation from "./_components/cases/gradeandevaluation";





const CvScreener = () => {
  const [currentScreener, setCurrentScreener] = useState("jobtitleanddescription");
  const [files, setFiles] = useState<FileItem[]>([]);

  // Form Initialization case one controls
  const methods = useForm<z.infer<typeof titleanddesCVScreenerschema | typeof uploadCVScreenerSchema>>({
    resolver: zodResolver(
      currentScreener === "jobtitleanddescription"
        ? titleanddesCVScreenerschema
        : uploadCVScreenerSchema
    ),
    defaultValues: {
      job_title: "",
      jobDescription: "",
      candidateCV: currentScreener === "uploadcv" ? null : undefined,
    },
  });

  const { control, setValue, watch, handleSubmit } = methods;

  // const onSubmit = async (values: z.infer<typeof uploadCVScreenerSchema>) => {
  //   try {
  //     if (currentScreener === "jobtitleanddescription") {
  //       setCurrentScreener("uploadcv");
  //     } else if (currentScreener === "uploadcv") {
  //       const payload = {
  //         job_title: values.job_title,
  //         jobDescription: values.jobDescription,
  //         candidateCV: files.length > 0 ? files.map(file => file.file) : null,
  //       };

  //       console.log("Payload Data", payload);

  //       const formData = new FormData();
  //       formData.append("job_title", payload.job_title);
  //       formData.append("jobDescription", payload.jobDescription);

  //       if (files.length > 0) {
  //         files.forEach((file, index) => {
  //           formData.append(`candidateCV[${index}]`, file.file);
  //         });
  //       } else {
  //         formData.append("candidateCV", "");
  //       }

  //       console.log("Final FormData submitted successfully!");
  //     }

  //     setCurrentScreener("gradeandevaluation");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const onSubmit = async (values: z.infer<typeof uploadCVScreenerSchema>) => {
    try {
      if (currentScreener === "jobtitleanddescription") {
        setCurrentScreener("uploadcv"); // Move to upload CV stage
        return;
      } 
      
      if (currentScreener === "uploadcv") {
        const payload = {
          job_title: values.job_title,
          jobDescription: values.jobDescription,
          candidateCV: files.length > 0 ? files.map(file => file.file) : null,
        };

        console.log("Payload Data", payload);

        const formData = new FormData();
        formData.append("job_title", payload.job_title);
        formData.append("jobDescription", payload.jobDescription);

        if (files.length > 0) {
          files.forEach((file, index) => {
            formData.append(`candidateCV[${index}]`, file.file);
          });
        } else {
          formData.append("candidateCV", "");
        }

        console.log("Final FormData submitted successfully!");

        setCurrentScreener("gradeandevaluation"); // Only move to grading after uploading
      }
      
    } catch (error) {
      console.error(error);
    }
  };






  // Case Two Controls
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files ? Array.from(event.target.files) : [];
    const validFiles = uploadedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 1024 * 1024
    );

    if (files.length + validFiles.length > 5) {
      alert("You can upload a maximum of 5 CVs at once.");
      return;
    }

    setFiles([
      ...files,
      ...validFiles.map((file) => ({ name: file.name, size: file.size, file })),
    ]);
  };

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Render Screener Views
  const renderScreener = () => {
    switch (currentScreener) {
      case "jobtitleanddescription":
        return (
          <FormProvider {...methods}>
            <JobTitleAndDescription
              control={control}
              setValue={setValue}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              jobTitle={watch("job_title")}
            />
          </FormProvider>
        );

      case "uploadcv":
        return (
          <UploadCV
            files={files}
            handleFileUpload={handleFileUpload}
            handleRemove={handleRemove}
            onSubmit={handleSubmit(onSubmit)}
          />
        );


        case "gradeandevaluation":
          return (
            <GradeAndEvaluation />
          );

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








