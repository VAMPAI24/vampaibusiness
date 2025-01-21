import React from "react";
import SubmitButton from "@/components/shared/SubmitButton";
import { CandidateProps } from "@/types";
import {
  useRejectCandidateMutation,
  useShortlistCandidateMutation,
} from "@/redux/features/job-posting/jobpostingApi";

import { formatAndTransformString } from "@/lib/utils";
import ScoreGauge from "../common/ScoreGauge";

const RankedCandidatesCard = ({
  candidateId,
  applicantName,
  applicantEmail,
  overallScore,
  insights,
  strengths,
  weaknesses,
  clickFn,
  refetchFn,
}: CandidateProps) => {
  //  shorlist candidate
  const [shortlistCandidate, { isLoading }] = useShortlistCandidateMutation();

  const handleShortlist = async () => {
    try {
      await shortlistCandidate({
        id: candidateId,
        status: "Shortlisted",
      }).unwrap();
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
      await rejectCandidate({ id: candidateId }).unwrap();
      refetchFn?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#F9FAFB] border border-main-200 rounded-lg  w-full cursor-pointer">
      <div className="p-6 flex items-start justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="ml-4 lg:ml-0">
              <h2 className="text-lg font-semibold capitalize">
                {applicantName}
              </h2>
              <p className="text-sm text-gray-600">{applicantEmail}</p>
            </div>
            <div className="ml-auto flex items-center">
              {/* <p className="border-2 p-2 rounded-full border-main-600">
                {overallScore && !isNaN(Number(overallScore))
                  ? `${(Number(overallScore) * 100).toFixed(2)}%`
                  : "N/A"}
              </p> */}

              <ScoreGauge
                overallScore={overallScore ? Number(overallScore) : null}
              />
            </div>

            <p
              onClick={clickFn}
              className="text-[.75em] font-[400] text-main-700 "
            >
              See Profile
            </p>
          </div>

          {/* <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Top skills:</h3>
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div> */}

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Core Strength:</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(strengths) ? (
                <div>
                  {(strengths ?? []).map((item, id) => (
                    <span
                      key={id.toString()}
                      className="px-6 py-1 bg-green-100 text-green-900 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="px-6 py-1 bg-green-100 text-green-900 text-sm rounded-full">
                  {strengths}
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Weakness:</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(weaknesses) ? (
                <div>
                  {(weaknesses ?? []).map((item, id) => (
                    <span
                      key={id.toString()}
                      className="px-6 py-1 bg-green-100 text-green-900 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="px-6 py-1 bg-green-100 text-green-900 text-sm rounded-full">
                  {weaknesses}
                </span>
              )}
            </div>
          </div>

          {/* <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
            <p className="text-blue-600 text-sm">
              <strong>AI Comment:</strong> {insights}
            </p>
          </div> */}

          <div className=" bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
            <p className="text-blue-600 text-sm">
              <strong>AI Comment:</strong>
            </p>

            <div
              className="text-[.875em] text-main-902 font-[300] space-y-[1em] div-listed"
              dangerouslySetInnerHTML={{
                __html: formatAndTransformString(insights),
              }}
            ></div>
          </div>
        </div>
        {/* <p className="text-[.75em] font-[400] text-main-700 ">See Profile</p> */}
      </div>

      <div className="p-6 flex flex-col sm:flex-row justify-end gap-4">
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

export default RankedCandidatesCard;
