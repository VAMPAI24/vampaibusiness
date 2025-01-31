import React from 'react'



interface Candidate {
    name: string;
    email: string;
    score: number;
    positiveFeedback: string[];
    negativeFeedback: string[];
  }
  
  const candidates: Candidate[] = [
    {
      name: "Daniel Babalola",
      email: "daniel@gmail.com",
      score: 90,
      positiveFeedback: [
        "Extensive product management experience, including launching products that generated significant revenue growth.",
        "Strong strategic thinking and data-driven decision-making abilities.",
        "Deep knowledge of customer research, user testing, and creating roadmaps.",
      ],
      negativeFeedback: [
        "Somewhat less hands-on with the development side of things, could benefit from more technical expertise.",
        "Tends to be more focused on big-picture strategy; might need to refine attention to small details and operational execution.",
      ],
    },
    {
      name: "Janet Lawson",
      email: "janet@gmail.com",
      score: 80,
      positiveFeedback: [
        "Strong background in product management with 5+ years of experience in the tech industry.",
        "Led multiple product launches from conception to completion with cross-functional teams, showcasing leadership and project management skills.",
        "Excellent communication skills, able to articulate product vision and strategy to both technical and non-technical stakeholders.",
      ],
      negativeFeedback: [
        "Limited experience in the specific industry (fintech) that the role is based in, though adaptable and quick to learn.",
        "Lack of hands-on experience with agile methodologies, although has worked in similar frameworks.",
      ],
    },
  ];

const GradeAndEvaluation = () => {
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
            {candidates.map((candidate, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-start">
                <td className="p-4 text-start">{candidate.name}</td>
                <td className="p-4 text-start">{candidate.email}</td>
                <td className="px-8">
                  <div className="relative flex items-center justify-center w-12 h-12">
                    <svg className="absolute w-12 h-12" viewBox="0 0 36 36">
                      <path
                        className="text-gray-300 stroke-current"
                        strokeWidth="4"
                        fill="none"
                        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                      />
                      <path
                        className="text-blue-500 stroke-current"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${candidate.score}, 100`}
                        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                      />
                    </svg>
                    <span className="absolute font-semibold text-blue-500">
                      {candidate.score}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="mb-2">
                    <span className="font-semibold text-green-600">Positive</span>
                    <ul className="list-disc pl-4 text-gray-700">
                      {candidate.positiveFeedback.map((feedback, i) => (
                        <li key={i}>{feedback}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-red-500">Negative</span>
                    <ul className="list-disc pl-4 text-gray-700">
                      {candidate.negativeFeedback.map((feedback, i) => (
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
  )
}

export default GradeAndEvaluation