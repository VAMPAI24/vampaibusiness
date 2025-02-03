// "use client";
// import React, { useState } from "react";
// import { DataTableRankedCandidate } from "./data-table-rankedcandidate";
// import { createColumnsRannkedCandidate } from "./columns-rankedcandidate";
// import { useRankApplicantsQuery } from "@/redux/features/job-posting/jobpostingApi";
// import { BallsLoader } from "@/components/ui/BallsLoader";
// import ApplicantRankingDetails from "@/components/jobboard/ApplicantRankingDetails";
// import CustomModal from "@/components/shared/CustomModal";
// import EventModalContent from "@/components/jobboard/EventModalContent";

// const RankedCandidate = ({ id }: { id: string }) => {
//   // Drawer Control
//   const [openApplicationDrawer, setOpenApplicationDrawer] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);

//   const handleViewProfile = (applicant: any) => {
//     setSelectedApplicant(applicant);
//     setOpenApplicationDrawer(true);
//   };

//   // Schedule modal control
//   const [open, setOpen] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
//   const openCloseModalFn = () => setOpen(!open);

//   const handleScheduleInterview = (candidate: any) => {
//     setSelectedCandidate(candidate);
//     openCloseModalFn();
//   };

//   // Application tab Ranked Candidate
//   const {
//     data: rankedCandidate,
//     isLoading: loadRanked,
//     isError,
//     error,
//     refetch: rankedRefetch,
//   } = useRankApplicantsQuery(id);

//   if (loadRanked) {
//     return (
//       <div className="w-full flex items-center justify-center">
//         <div className="w-fit h-[10em] flex flex-col items-center justify-center gap-[.5em]">
//           <BallsLoader />
//           <p className="text-[.875em] text-main-900 text-center">
//             Loading ranked candidates...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <p>
//         Error:{" "}
//         {isError && "status" in error
//           ? `Error: ${error.status}`
//           : "Failed to load ranked candidates"}
//       </p>
//     );
//   }

//   const transformedData = rankedCandidate?.data?.map(
//     (applicant: {
//       id: string;
//       date: string;
//       profile_picture: string;
//       applied_position: string;
//       applicantName: string;
//       applicantEmail: string;
//       overallScore: number;
//       insights: string;
//       strengths: string[];
//       weaknesses: string[];
//     }) => ({
//       id: applicant.id,
//       date: applicant.date,
//       profile_picture: applicant.profile_picture,
//       applied_position: applicant.applied_position,
//       applicantName: applicant.applicantName,
//       email: applicant.applicantEmail,
//       overallScore: applicant.overallScore,
//       insights: applicant.insights,
//       strengths: applicant.strengths.join(", "),
//       weaknesses: applicant.weaknesses.join(", "),
//     })
//   );

//   return (
//     <div className="mt-5">
//       {/* Ranked candidate Table */}
//       <DataTableRankedCandidate
//         columns={createColumnsRannkedCandidate(rankedRefetch)}
//         data={transformedData || []}
//         onViewProfile={handleViewProfile}
//         onScheduleInterview={handleScheduleInterview} // Pass the onScheduleInterview prop
//       />

//       {/* Ranked candidate Drawer */}
//       <ApplicantRankingDetails
//         isOpen={openApplicationDrawer}
//         candidate={selectedApplicant}
//         onClose={() => setOpenApplicationDrawer(false)}
//       />

//       {/* Ranked candidate Schedule event modal */}
//       <CustomModal
//         isOpen={open}
//         onClose={openCloseModalFn}
//         className={"w-[95%] md:max-w-lg"}
//       >
//         <EventModalContent
//           name={
//             selectedCandidate?.applicantName
//           }
//           email={selectedCandidate?.email ?? ""}
//           onClose={openCloseModalFn}
//           applicant_Id={selectedCandidate?.id ?? ""}
//         />
//       </CustomModal>
//     </div>
//   );
// };

// export default RankedCandidate;




"use client";
import React, { useState } from "react";
import { DataTableRankedCandidate } from "./data-table-rankedcandidate";
import { createColumnsRannkedCandidate } from "./columns-rankedcandidate";
import { useRankApplicantsQuery } from "@/redux/features/job-posting/jobpostingApi";
import { BallsLoader } from "@/components/ui/BallsLoader";
import ApplicantRankingDetails from "@/components/jobboard/ApplicantRankingDetails";
import CustomModal from "@/components/shared/CustomModal";
import EventModalContent from "@/components/jobboard/EventModalContent";

const RankedCandidate = ({ id }: { id: string }) => {
  // Drawer Control
  const [openApplicationDrawer, setOpenApplicationDrawer] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleViewProfile = (applicant: any) => {
    setSelectedApplicant(applicant);
    setOpenApplicationDrawer(true);
  };

  // Schedule modal control
  const [open, setOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const openCloseModalFn = () => setOpen(!open);

  const handleScheduleInterview = (candidate: any) => {
    setSelectedCandidate(candidate);
    openCloseModalFn();
  };

  // Fetch Ranked Candidates
  const {
    data: rankedCandidate,
    isLoading: loadRanked,
    isError,
    error,
    refetch: rankedRefetch,
  } = useRankApplicantsQuery(id);

  if (loadRanked) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="w-fit h-[10em] flex flex-col items-center justify-center gap-[.5em]">
          <BallsLoader />
          <p className="text-[.875em] text-main-900 text-center">
            Loading ranked candidates...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p>
        Error: {isError && "status" in error ? `Error: ${error.status}` : "Failed to load ranked candidates"}
      </p>
    );
  }

  const transformedData = rankedCandidate?.data?.map(
    (applicant: {
      id: string;
      profile_id: string;
      date: string;
      profile_picture: string;
      applied_position: string;
      applicantName: string;
      applicantEmail: string;
      overallScore: number;
      insights: string;
      strengths: string[];
      weaknesses: string[];
    }) => ({
      id: applicant.id,
      profile_id: applicant.profile_id, // Ensure profile_id is stored
      date: applicant.date,
      profile_picture: applicant.profile_picture,
      applied_position: applicant.applied_position,
      applicantName: applicant.applicantName,
      email: applicant.applicantEmail,
      overallScore: applicant.overallScore,
      insights: applicant.insights,
      strengths: applicant.strengths.join(", "),
      weaknesses: applicant.weaknesses.join(", "),
    })
  );

  return (
    <div className="mt-5">
      {/* Ranked Candidate Table */}
      <DataTableRankedCandidate
        columns={createColumnsRannkedCandidate(rankedRefetch)}
        data={transformedData || []}
        onViewProfile={handleViewProfile}
        onScheduleInterview={handleScheduleInterview}
      />

      {/* Ranked Candidate Drawer */}
      <ApplicantRankingDetails
        isOpen={openApplicationDrawer}
        candidate={selectedApplicant}
        onClose={() => setOpenApplicationDrawer(false)}
      />

      {/* Ranked Candidate Schedule Event Modal */}
      <CustomModal isOpen={open} onClose={openCloseModalFn} className={"w-[95%] md:max-w-lg"}>
        <EventModalContent
          name={selectedCandidate?.applicantName}
          email={selectedCandidate?.email ?? ""}
          onClose={openCloseModalFn}
          applicant_Id={selectedCandidate?.profile_id ?? ""} // FIX: Use profile_id instead of id
        />
      </CustomModal>
    </div>
  );
};

export default RankedCandidate;
