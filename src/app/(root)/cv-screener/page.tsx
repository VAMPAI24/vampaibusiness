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
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import JobTitleAndDescription from "./_components/cases/JobTitleAndDescription";
import UploadCV from "./_components/cases/UploadCV";
import { FileItem } from "@/types";
import { titleanddesCVScreenerschema, uploadCVScreenerSchema } from "@/lib/schemas";





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

  const onSubmit = async (values: z.infer<typeof uploadCVScreenerSchema>) => {
    try {
      if (currentScreener === "jobtitleanddescription") {
        setCurrentScreener("uploadcv");
      } else if (currentScreener === "uploadcv") {
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
