import React from "react";
import SubmitButton from "@/components/shared/SubmitButton";
import { CandidateCardProps } from "@/types";
import {
  useRejectCandidateMutation,
  useShortlistCandidateMutation,
} from "@/redux/features/job-posting/jobpostingApi";

const CandidateCard = ({
  id,
  candidateId,
  applicant_first_name,
  applicant_last_name,
  applicant_email,
  message,
  refetchFn,
  clickFn,
}: CandidateCardProps) => {
 

  //  shorlist candidate
  const [shortlistCandidate, { isLoading }] = useShortlistCandidateMutation();

  const handleShortlist = async () => {

    try {
      await shortlistCandidate({ id: candidateId, status: 'Shortlisted' }).unwrap();
      refetchFn?.(); 
     
    } catch (error) {
      console.error(error);
      
    }
  };

  //  reject candidate
  const [rejectCandidate, { isLoading: isRejecting }] =
    useRejectCandidateMutation();
  const handleReject = async () => {
    try {
      await rejectCandidate({id:candidateId}).unwrap();
      
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div
     
      key={id}
      className="w-full lg:w-[90%]  border border-main-200 rounded-xl bg-[#F9FAFB] cursor-pointer shadow-sm"
    >
      <div  className="p-6" onClick={clickFn}>
        <div className="flex items-start justify-between">
          <div className="flex  flex-col items-start">
            <div className=" flex gap-2">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {applicant_first_name}
              </h2>
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {applicant_last_name}
              </h2>
            </div>

            <p className="text-sm text-gray-800">{applicant_email}</p>
          </div>
        </div>

        {/* Skills Section */}
        {/* <div className="mt-6">
        <h3 className="text-md font-bold font-jakarta text-vamp-900">
          Top skills:
        </h3>
        <div className="flex flex-wrap mt-3 gap-2">
          {skills?.map((skill) => (
            <span
              key={skill}
              className="bg-main-100 text-main-902 text-sm font-medium px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div> */}

        <div className="mt-4 mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
          <p className="text-blue-600 text-sm">
            <strong>Message:</strong> {message}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 p-6 flex flex-col sm:flex-row justify-end gap-4">
        <SubmitButton
          isLoading={isLoading}
          clickFn={handleShortlist}
          className="rounded-full px-4"
        >
          Shortlist Candidate
        </SubmitButton>
        <SubmitButton
          isLoading={isRejecting}
          clickFn={handleReject}
          className="rounded-full px-4 bg-[#FBD5D5] hover:bg-[#dca3a3] selection: text-[#9B1c1c]"
        >
          Reject Candidate
        </SubmitButton>
      </div>
    </div>
  );
};

export default CandidateCard;
