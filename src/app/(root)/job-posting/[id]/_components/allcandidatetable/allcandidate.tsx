import React from "react";
import { useGetJobApplicationsQuery } from "@/redux/features/job-posting/jobpostingApi";
import { DataTable } from "./data-table-allcandidate";
import { createColumns } from "./columns-allcandidate";
import { BallsLoader } from "@/components/ui/BallsLoader";

const AllCandidate = ({ id }: { id: string }) => {
  const {
    data: candidateData,
    isLoading: loadCandidates,
    isError,
    error,
    refetch: candidateRefetch,
  } = useGetJobApplicationsQuery(id);

  // Transform the candidateData to match the structure of the table columns if necessary
  const transformedData = candidateData?.data?.map(
    (applicant: {
      id: string;
      applicant_first_name: string;
      applicant_last_name: string;
      applicant_email: string;
      applicant_phone: string;
      cv_file: string;
      status: string;
      profile_pics: string;
      created_at: string;
      applied_possition: string;
     
    }) => ({
      id: applicant.id,
      firstName: applicant.applicant_first_name,
      lastName: applicant.applicant_last_name,
      email: applicant.applicant_email,
      phone: applicant.applicant_phone || "N/A",
      cvLink: applicant.cv_file,
      status: applicant.status,
      profile_pics: applicant.profile_pics,
      created_at: applicant.created_at,
      applied_possition: applicant.applied_possition,
    })
  );

  if (loadCandidates) {
    // return <p className="mt-10">Loading candidates...</p>;
    return (
      <div className="w-full flex items-center justify-center">
        <div className="w-fit h-[10em] flex flex-col items-center justify-center gap-[.5em]">
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
    <div className="mt-5">
      <DataTable
        columns={createColumns(candidateRefetch)}
        data={transformedData || []}
      />
    </div>
  );
};

export default AllCandidate;
