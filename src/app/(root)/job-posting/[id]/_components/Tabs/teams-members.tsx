"use client";

import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/shared/SubmitButton";
import ToastNotification from "@/components/shared/ToastNotification";
import {
  useDeleteTeamMemberMutation,
  useGetInvitedTeamMembersQuery,
  useInviteTeamMemebrMutation,
} from "@/redux/features/job-posting-id/job-posting-IdApi";
import { Empty } from "@/components/ui/empty";
import { BallsLoader } from "@/components/ui/BallsLoader";

const TeamsMembers = ({ Job_Id }: { Job_Id: string }) => {
  //send Inite
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CREATOR");
  const [inviteTeamMemebr, { isLoading }] = useInviteTeamMemebrMutation();
  const [loadingMemberId, setLoadingMemberId] = useState<string | null>(null);

  // Get invited members
  const {
    data: InvitedMemberData,
    isLoading: LoadingInvitedMemberData,
    refetch: membersRefetch,
  } = useGetInvitedTeamMembersQuery(Job_Id);


  // Remove Invited Team Member
  const [deleteTeamMember, { isLoading: loadingDeleteMember }] =
    useDeleteTeamMemberMutation();

    const handleDelete = async (team_Id: string) => {
      const confirmDelete = confirm("Are you sure you want to remove this member?");
      if (confirmDelete) {
        setLoadingMemberId(team_Id); 
        try {
          await deleteTeamMember(team_Id);
          membersRefetch(); 
        } catch (error) {
          console.error("Error deleting member:", error);
        } finally {
          setLoadingMemberId(null); 
        }
      }
    };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      ToastNotification({
        title: "Error",
        description: "Please enter an email!",
        type: "error",
      });
      return;
    }

    try {
      await inviteTeamMemebr({
        work_email: email,
        status: role,
        job_Id: Job_Id,
      }).unwrap();
      membersRefetch(); 

      setEmail("");
      setRole("CREATOR");
    } catch (error: any) {
      console.error("Error inviting member:", error);
    }
  };

  return (
    <div>
      {/* Invite */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="mt-6 text-[#001633] font-rubik text-[20px]">
          Invite team Members
        </p>

        <div className="flex items-center gap-4 w-full lg:w-[600px] rounded-lg">
          <div className="flex items-center w-full h-[40px] border border-blue-600 bg-blue-50 rounded px-3 py-2">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              // required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-blue-600 bg-blue-50 rounded px-2 py-1 text-sm outline-none"
            >
              <option value="CREATOR">Creator</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>

          <SubmitButton
            isLoading={isLoading}
            // loadingText="Inviting..."
            className="h-[40px] w-[150px]"
          >
            Invite
          </SubmitButton>
        </div>
      </form>

      {/* Invite list */}
      <div className="mt-14">
        <h2 className="text-[#001633] font-rubik text-[20px]">Team Members</h2>
        <p className="text-[#002A62] font-jakarta text-sm">
          Manage your team members here.
        </p>

        <div>
          <div className="overflow-hidden border rounded mt-4">
            {LoadingInvitedMemberData ? (
              // Loading Skeleton or Message
              <div className="w-full mx-auto flex items-center justify-center">
                <div className="w-full h-[10em] flex flex-col items-center justify-center gap-[.5em]">
                  <BallsLoader />
                  <p className="text-[.875em] text-main-900 text-center">
                    Loading team members..
                  </p>
                </div>
              </div>
            ) : (
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
                  {InvitedMemberData?.data.length > 0 ? (
                    InvitedMemberData.data.map((member: any, index: any) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50 text-start"
                      >
                        <td className="p-4 text-start text-sm font-jakarta text-sec-901">
                          {member?.first_name ?? "N/A"}{" "}
                          {member?.last_name ?? ""}
                        </td>
                        <td className="p-4 text-start text-sm font-jakarta text-sec-901">{member?.work_email}</td>
                        <td className="p-4 text-start text-sm font-jakarta text-sec-901">{member?.status}</td>
                        <td className="p-4 text-start">
                          <SubmitButton
                            isLoading={loadingMemberId === member.id}
                            clickFn={() => handleDelete(member.id)}
                            className="w-full sm:w-[150px] h-11 bg-red-600 hover:bg-red-500"
                          >
                            Remove
                          </SubmitButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        <Empty
                          title="No Team Member"
                          subtitle="No team members found."
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsMembers;
