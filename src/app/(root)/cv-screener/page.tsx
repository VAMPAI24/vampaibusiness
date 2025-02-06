






// "use client";

// import React, { useState } from "react";
// import CvHeaders from "./_components/cv-headers";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import JobTitleAndDescription from "./_components/cases/JobTitleAndDescription";
// import UploadCV from "./_components/cases/UploadCV";
// import { FileItem } from "@/types";
// import { titleanddesCVScreenerschema, uploadCVScreenerSchema } from "@/lib/schemas";
// import GradeAndEvaluation from "./_components/cases/gradeandevaluation";
// import { useCvscoringMutation } from "@/redux/features/cv-scoring/cvscoringApi";
// import ToastNotification from "@/components/shared/ToastNotification";





// const CvScreener = () => {
//   const [currentScreener, setCurrentScreener] = useState("jobtitleanddescription");
//   const [files, setFiles] = useState<FileItem[]>([]);
//   const [scoredData, setScoredData] = useState([])


//   // Form Initialization case one controls
//   const methods = useForm<z.infer<typeof titleanddesCVScreenerschema | typeof uploadCVScreenerSchema>>({
//     resolver: zodResolver(
//       currentScreener === "jobtitleanddescription"
//         ? titleanddesCVScreenerschema
//         : uploadCVScreenerSchema
//     ),
//     defaultValues: {
//       job_title: "",
//       jobDescription: "",
//       candidateCV: currentScreener === "uploadcv" ? null : undefined,
//     },
//   });

//   const { control, setValue, watch, handleSubmit } = methods;





//   const [cvscoring, { isLoading: isLoadCVScreener }] =
//   useCvscoringMutation();



//   const onSubmit = async (values: z.infer<typeof uploadCVScreenerSchema>) => {
//     try {
//       if (currentScreener === "jobtitleanddescription") {
//         setCurrentScreener("uploadcv"); // Move to upload CV stage
//         return;
//       } 
      
//       if (currentScreener === "uploadcv") {
//         const payload = {
//           job_title: values.job_title,
//           jobDescription: values.jobDescription,
//           candidateCV: files.length > 0 ? files.map(file => file.file) : null,
//         };

    
//         const formData = new FormData();
//         formData.append("job_description", payload.jobDescription);

//         if (files.length > 0) {
//           files.forEach((file, index) => {
//             formData.append(`files`, file.file);
//           });
//         } else {
//           formData.append("candidateCV", "");
//         }

//         // console.log("Final FormData submitted successfully!");
//         const response = await cvscoring(formData).unwrap();
//         setScoredData(response?.data)


//         console.log("API Response:", response);
//         setCurrentScreener("gradeandevaluation"); 
//       }
      
//     } catch (error) {
//       console.error(error);
//     }
//   };






//   // Case Two Controls
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const uploadedFiles = event.target.files ? Array.from(event.target.files) : [];
//     const validFiles = uploadedFiles.filter(
//       (file) => file.type === "application/pdf" && file.size <= 1024 * 1024
//     );

//     if (files.length + validFiles.length > 5) {
//       ToastNotification({
//         title: "Maximum CVs reached",
//         description: "You can upload a maximum of 5 CVs at once.",
//         type: "error",
//       });
//       return;
//     }

//     setFiles([
//       ...files,
//       ...validFiles.map((file) => ({ name: file.name, size: file.size, file })),
//     ]);
//   };

//   const handleRemove = (index: number) => {
//     setFiles(files.filter((_, i) => i !== index));
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
//           <UploadCV
//             files={files}
//             handleFileUpload={handleFileUpload}
//             handleRemove={handleRemove}
//             onSubmit={handleSubmit(onSubmit)}
//             isLoadCVScreener={isLoadCVScreener}
//           />
//         );


//         case "gradeandevaluation":
//           return (
//             <GradeAndEvaluation />
//           );

//       default:
//         return <div>Invalid screener view</div>;
//     }
//   };

//   return (
//     <section>
//       <CvHeaders title="CV Screener" description="Grade and evaluate candidate CVs" />
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
import GradeAndEvaluation from "./_components/cases/gradeandevaluation";
import { useCvscoringMutation } from "@/redux/features/cv-scoring/cvscoringApi";
import ToastNotification from "@/components/shared/ToastNotification";

const CvScreener = () => {
  const [currentScreener, setCurrentScreener] = useState("jobtitleanddescription");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [scoredData, setScoredData] = useState([]);



  // Form Initialization
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

  const [cvscoring, { isLoading: isLoadCVScreener }] = useCvscoringMutation();

  const onSubmit = async (values: z.infer<typeof uploadCVScreenerSchema>) => {
    try {
      if (currentScreener === "jobtitleanddescription") {
        setCurrentScreener("uploadcv");
        return;
      }

      if (currentScreener === "uploadcv") {
        const formData = new FormData();
        formData.append("job_description", values.jobDescription);

        if (files.length > 0) {
          files.forEach((file) => {
            formData.append("files", file.file);
          });
        } else {
          formData.append("candidateCV", "");
        }

 
        
        // Call API and store response
        const response = await cvscoring(formData).unwrap();
        setScoredData(response?.data);

      // ✅ Reset state after successful API submission
      setFiles([]); // Clears uploaded files
      methods.reset(); // Reset form fields

        setCurrentScreener("gradeandevaluation");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Case Two Controls
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files ? Array.from(event.target.files) : [];
    const validFiles = uploadedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 1024 * 1024
    );

    if (files.length + validFiles.length > 5) {
      ToastNotification({
        title: "Maximum CVs reached",
        description: "You can upload a maximum of 5 CVs at once.",
        type: "error",
      });
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
            isLoadCVScreener={isLoadCVScreener}
            setCurrentScreener={setCurrentScreener}
          />
        );

      case "gradeandevaluation":
        return <GradeAndEvaluation scoredData={scoredData} setCurrentScreener={setCurrentScreener} />; 

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









