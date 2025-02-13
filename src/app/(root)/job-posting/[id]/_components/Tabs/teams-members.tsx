"use client";

import React, { useState } from "react";
import SubmitButton from "@/components/shared/SubmitButton";

const TeamsMembers = () => {
  // State to store email and role selection
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  //   const [loading, setLoading] = useState(false); // Handle loading state

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    const inputData = { email, role };
    console.log("Submitting:", inputData);

    try {
      //   setLoading(true);
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("User invited successfully!");
        setEmail(""); // Clear input after success
        setRole("viewer"); // Reset role selection
      } else {
        alert(`Error: ${data.message || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send invitation. Please try again.");
    } finally {
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="mt-6">Invite team Members</p>

          <div className="flex items-center gap-4 w-[600px] rounded-lg">
            <div className="flex items-center w-full h-[40px] border border-blue-600 bg-blue-50 rounded px-3 py-2 ">
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-main-300 bg-blue-50 rounded px-2 py-1 text-sm outline-none"
              >
                <option value="viewer">Viewer</option>
                <option value="creator">Creator</option>
              </select>
            </div>

            {/* Invite Button */}
            <SubmitButton className="h-[40px] w-20 bg-blue-600 text-white rounded">
              Invite
            </SubmitButton>
          </div>
        </form>
      </div>

      <div className="mt-10">
        <h2>Team Members</h2>
        <p>Manage your team members here.</p>

        <div>
          <div className="overflow-hidden border rounded mt-4">
            <table className="w-full bg-white border-collapse">
              <thead className="bg-[#f8f9ff]">
                <tr className="text-left text-gray-600">
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Access</th>
                  <th className="p-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {scoredData.map((candidate: any, index: any) => ( */}
                <tr className="border-b hover:bg-gray-50 text-start">
                  <td className="p-4 text-start">jjdjdjjdjjd</td>
                  <td className="p-4 text-start">ndnndndnndn</td>
                  <td className="">dndnnndndnndn</td>
                  <td className="p-4">
                    <div className="mb-2">
                      <span className="font-semibold text-green-600">
                        Positive
                      </span>
                      {/* <ul className="list-disc pl-4 text-gray-700">
                      {candidate.strengths.map((feedback: any, i: any) => (
                        <li key={i}>{feedback}</li>
                      ))}
                    </ul> */}
                    </div>
                    <div>
                      <span className="font-semibold text-red-500">
                        Negative
                      </span>
                      {/* <ul className="list-disc pl-4 text-gray-700">
                      {candidate.weaknesses.map((feedback: any, i: any) => (
                        <li key={i}>{feedback}</li>
                      ))}
                    </ul> */}
                    </div>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsMembers;
