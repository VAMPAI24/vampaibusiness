import React from 'react';
import { DataTable } from './data-table';
import { Payment, columns } from './columns'; // Adjust imports based on your actual setup
import { useGetJobApplicationsQuery } from '@/redux/features/job-posting/jobpostingApi';

const AllCandidate = ({ id }: { id: string }) => {
  const {
    data: candidateData,
    isLoading: loadCandidates,
    isError,
    error,
    refetch: candidateRefetch,
  } = useGetJobApplicationsQuery(id);

  // Transform the candidateData to match the structure of the table columns if necessary
  const transformedData = candidateData?.data?.jobApplicant?.map((applicant) => ({
    id: applicant.id,
    firstName: applicant.applicant_first_name,
    lastName: applicant.applicant_last_name,
    email: applicant.applicant_email,
    phone: applicant.applicant_phone || 'N/A',
    cvLink: applicant.cv_file,
    status: applicant.status,
  }));

  if (loadCandidates) {
    return <p>Loading candidates...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || 'Failed to load candidates'}</p>;
  }

  return (
    <div className="">
      <DataTable columns={columns} data={transformedData || []} />
    </div>
  );
};

export default AllCandidate;
