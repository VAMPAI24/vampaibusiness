// import React from "react";
// import { useGetJobApplicationsQuery } from "@/redux/features/job-posting/jobpostingApi";
// import { DataTable } from "./data-table-allcandidate";
// import { createColumns } from "./columns-allcandidate";
// import { BallsLoader } from "@/components/ui/BallsLoader";

// const AllCandidate = ({ id }: { id: string }) => {
//   const {
//     data: candidateData,
//     isLoading: loadCandidates,
//     isError,
//     error,
//     refetch: candidateRefetch,
//   } = useGetJobApplicationsQuery(id);

//   // Transform the candidateData to match the structure of the table columns if necessary
//   const transformedData = candidateData?.data?.map(
//     (applicant: {
//       id: string;
//       applicant_first_name: string;
//       applicant_last_name: string;
//       applicant_email: string;
//       applicant_phone: string;
//       cv_file: string;
//       status: string;
//       profile_pics: string;
//       created_at: string;
//       applied_possition: string;
     
//     }) => ({
//       id: applicant.id,
//       firstName: applicant.applicant_first_name,
//       lastName: applicant.applicant_last_name,
//       email: applicant.applicant_email,
//       phone: applicant.applicant_phone || "N/A",
//       cvLink: applicant.cv_file,
//       status: applicant.status,
//       profile_pics: applicant.profile_pics,
//       created_at: applicant.created_at,
//       applied_possition: applicant.applied_possition,
//     })
//   );

//   if (loadCandidates) {
//     // return <p className="mt-10">Loading candidates...</p>;
//     return (
//       <div className=" w-full mx-auto flex items-center justify-center">
//         <div className="w-full h-[10em] flex flex-col items-center justify-center gap-[.5em]">
//           <BallsLoader />
//           <p className="text-[.875em] text-main-900 text-center">
//             Loading candidates...
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
//           : "Failed to load candidates"}
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-full mt-5">
//       <DataTable
//         columns={createColumns(candidateRefetch)}
//         data={transformedData || []}
//       />
//     </div>
//   );
// };

// export default AllCandidate;

import React, { useMemo, useState } from "react";
import { useGetJobApplicationsQuery } from "@/redux/features/job-posting/jobpostingApi";
import { DataTable } from "./data-table-allcandidate";
import { createColumns } from "./columns-allcandidate";
import { BallsLoader } from "@/components/ui/BallsLoader";

const PAGE_SIZE = 10; // Number of candidates per page

const AllCandidate = ({ id }: { id: string }) => {
  const {
    data: candidateData,
    isLoading: loadCandidates,
    isError,
    error,
    refetch: candidateRefetch,
  } = useGetJobApplicationsQuery(id);

  const [currentPage, setCurrentPage] = useState(1);

  // Cache the first 1000 candidates using useMemo
  const cachedData = useMemo(() => {
    return candidateData?.data?.slice(0, 1000) || [];
  }, [candidateData]);

  // Paginate the cached data (returning 10 at a time)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return cachedData.slice(startIndex, endIndex);
  }, [cachedData, currentPage]);

  if (loadCandidates) {
    return (
      <div className="w-full mx-auto flex items-center justify-center">
        <div className="w-full h-[10em] flex flex-col items-center justify-center gap-[.5em]">
          <BallsLoader />
          <p className="text-[.875em] text-main-900 text-center">
            Loading candidates...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p>
        Error:{" "}
        {isError && "status" in error
          ? `Error: ${error.status}`
          : "Failed to load candidates"}
      </p>
    );
  }

  return (
    <div className=" mt-5">
      <DataTable
        columns={createColumns(candidateRefetch)}
        data={paginatedData || []}
      />
      
      {/* Pagination Controls */}
      <div className="flex justify-end pr-[80px] mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4  mx-1 border text-sm rounded-lg shadow disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-2 py-2">{currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev * PAGE_SIZE < cachedData.length ? prev + 1 : prev
            )
          }
          disabled={currentPage * PAGE_SIZE >= cachedData.length}
          className="px-4  mx-1 border text-sm rounded-lg shadow disabled:opacity-50"
        
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCandidate;


