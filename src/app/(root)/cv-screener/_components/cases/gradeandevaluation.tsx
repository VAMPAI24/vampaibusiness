/* eslint-disable @typescript-eslint/no-explicit-any */
import ScoreGauge from "@/components/common/ScoreGauge";
import React from "react";

const GradeAndEvaluation = ({ scoredData }: { scoredData: any }) => {
  return (
    <div className="">
      <div className="overflow-hidden border rounded">
        <table className="w-full bg-white border-collapse">
          <thead className="bg-[#f8f9ff]">
            <tr className="text-left text-gray-600">
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Email</th>
              <th className="p-4 border-b">Score</th>
              <th className="p-4 border-b">Comment</th>
            </tr>
          </thead>
          <tbody>
            {scoredData.map((candidate: any, index: any) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-start">
                <td className="p-4 text-start">{candidate?.full_name}</td>
                <td className="p-4 text-start">{candidate?.email}</td>
                <td className="">
                  <ScoreGauge
                    overallScore={
                      candidate?.overallScore
                        ? Number(candidate?.overallScore) / 100
                        : null
                    }
                  />
                </td>
                <td className="p-4">
                  <div className="mb-2">
                    <span className="font-semibold text-green-600">
                      Positive
                    </span>
                    <ul className="list-disc pl-4 text-gray-700">
                      {candidate.strengths.map((feedback: any, i: any) => (
                        <li key={i}>{feedback}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-red-500">Negative</span>
                    <ul className="list-disc pl-4 text-gray-700">
                      {candidate.weaknesses.map((feedback: any, i: any) => (
                        <li key={i}>{feedback}</li>
                      ))}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeAndEvaluation;
