// "use client";

// import React, { useState } from "react";
// import CvHeaders from "./_components/cv-headers";
// import SubmitButton from "@/components/shared/SubmitButton";
// import CustomFormField, {
//   FormFieldType,
// } from "@/components/shared/inputs/CustomFormField";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Sun, Pencil } from "lucide-react";
// import {
//   useJobDescriptionAIMutation,
//   useJobDescriptionAIRewiteMutation,
// } from "@/redux/features/job-posting/jobpostingApi";
// import ToastNotification from "@/components/shared/ToastNotification";
// import JobTitleAndDescription from "./_components/cases/JobTitleAndDescription";
// // import { titleanddesCVScreenerschema, uploadCVScreenerSchema } from "@/lib/schemas";
// import { Upload } from "@/components/common/upload";
// import CVUpload from "@/components/common/CVUpload";

// export const titleanddesCVScreenerschema = z.object({
//   job_title: z.string().min(1, "Job title is required"),
//   jobDescription: z
//     .string()
//     .min(10, "Job Description must be at least 10 characters long")
//     .max(5000, "Job Description cannot exceed 5000 characters"),
// });

// export const uploadCVScreenerSchema = z.object({
//   job_title: z.string().min(1, "Job title is required"),
//   jobDescription: z
//     .string()
//     .min(10, "Job Description must be at least 10 characters long")
//     .max(5000, "Job Description cannot exceed 5000 characters"),
//   candidateCV: z.null(),
// });

// const CvScreener = () => {
//   const [currentScreener, setCurrentScreener] = useState(
//     "jobtitleanddescription"
//   );

//   // Form Initialization
//   const methods = useForm<
//     z.infer<typeof titleanddesCVScreenerschema | typeof uploadCVScreenerSchema>
//   >({
//     resolver: zodResolver(
//       currentScreener === "jobtitleanddescription"
//         ? titleanddesCVScreenerschema
//         : uploadCVScreenerSchema
//     ),
//     defaultValues: {
//       job_title: "",
//       jobDescription: "",
//       candidateCV: null,
//     },
//   });

//   const { control, setValue, watch, handleSubmit } = methods;

//   // Form Submission Handler
//   const onSubmit = async (
//     values: z.infer<typeof titleanddesCVScreenerschema | typeof uploadCVScreenerSchema>
//   ) => {
//     const payload = {
//       job_title: values.job_title,
//       jobDescription: values.jobDescription,
//       candidateCV: values.candidateCV,
//     };

//     console.log(payload);

//     try {
//       alert("Form submitted successfully");
//       setCurrentScreener("uploadcv");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   // Render Screener Views
//   const renderScreener = () => {
//     switch (currentScreener) {
//       case "jobtitleanddescription":
//         return (
//           <FormProvider {...methods}>
//             <JobTitleAndDescription
//               control={control}
//               setValue={setValue}
//               handleSubmit={handleSubmit}
//               onSubmit={onSubmit}
//               jobTitle={watch("job_title")}
//             />
//           </FormProvider>

        
//         );

//       case "uploadcv":
//         return (
//           <FormProvider {...methods}>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="flex flex-col gap-2 lg:w-1/2">
//                 <h2 className="text-lg font-bold">Upload CV</h2>
//                 <p className="text-gray-600">
//                   Attach the candidate's CV for screening.
//                 </p>

//                 <CVUpload />
               

//                 <div className="flex justify-end items-center">
//                   <SubmitButton className="w-full sm:w-[120px] h-11 mt-2">
//                     Next
//                   </SubmitButton>
//                 </div>
//               </div>
//             </form>
//           </FormProvider>
//         );

//         case "gradeandevaluation":
//           return (
//             <FormProvider {...methods}>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 <div className="flex flex-col gap-2 lg:w-1/2">
//                   <h2 className="text-lg font-bold">Upload CV</h2>
//                   <p className="text-gray-600">
//                     Attach the candidate's CV for screening.
//                   </p>
//                   <p>gradeandevaluation</p>
  
//                   </div>
//               </form>
//             </FormProvider>
//           );

//       default:
//         return <div>Invalid screener view</div>;
//     }
//   };

//   return (
//     <section>
//       <CvHeaders
//         title="CV Screener"
//         description="Grade and evaluate candidate CVs"
//       />
//       {renderScreener()}
//     </section>
//   );
// };

// export default CvScreener;





"use client";

import React, { useState } from "react";
import CvHeaders from "./_components/cv-headers";
import SubmitButton from "@/components/shared/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import JobTitleAndDescription from "./_components/cases/JobTitleAndDescription";
import CVUpload from "@/components/common/CVUpload";

export const titleanddesCVScreenerschema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  jobDescription: z
    .string()
    .min(10, "Job Description must be at least 10 characters long")
    .max(5000, "Job Description cannot exceed 5000 characters"),
});

export const uploadCVScreenerSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  jobDescription: z
    .string()
    .min(10, "Job Description must be at least 10 characters long")
    .max(5000, "Job Description cannot exceed 5000 characters"),
  candidateCV: z.instanceof(File).nullable(),
});

const CvScreener = () => {
  const [currentScreener, setCurrentScreener] = useState(
    "jobtitleanddescription"
  );

  // Form Initialization
  const methods = useForm<
    z.infer<typeof titleanddesCVScreenerschema | typeof uploadCVScreenerSchema>
  >({
    resolver: zodResolver(
      currentScreener === "jobtitleanddescription"
        ? titleanddesCVScreenerschema
        : uploadCVScreenerSchema
    ),
    defaultValues: {
      job_title: "",
      jobDescription: "",
      candidateCV: null,
    },
  });

  const { control, setValue, watch, handleSubmit } = methods;

  // Form Submission Handler
  const onSubmit = async (
    values: z.infer<typeof uploadCVScreenerSchema>
  ) => {
    const formData = new FormData();
    formData.append("job_title", values.job_title);
    formData.append("jobDescription", values.jobDescription);

    if (values.candidateCV) {
      formData.append("candidateCV", values.candidateCV);
    }

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload CV");
      }

      console.log("CV uploaded successfully!");
      alert("CV submitted successfully");
      setCurrentScreener("uploadcv");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-2 lg:w-1/2">
                <h2 className="text-lg font-bold">Upload CV</h2>
                <p className="text-gray-600">
                  Attach the candidate's CV for screening.
                </p>

                <CVUpload />

                <div className="flex justify-end items-center">
                  <SubmitButton className="w-full sm:w-[120px] h-11 mt-2">
                    Next
                  </SubmitButton>
                </div>
              </div>
            </form>
          </FormProvider>
        );

      case "gradeandevaluation":
        return (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col gap-2 lg:w-1/2">
                <h2 className="text-lg font-bold">Grade & Evaluation</h2>
                <p className="text-gray-600">
                  Review and evaluate the submitted CVs.
                </p>
                <p>Evaluation content will be here.</p>
              </div>
            </form>
          </FormProvider>
        );

      default:
        return <div>Invalid screener view</div>;
    }
  };

  return (
    <section>
      <CvHeaders
        title="CV Screener"
        description="Grade and evaluate candidate CVs"
      />
      {renderScreener()}
    </section>
  );
};

export default CvScreener;

