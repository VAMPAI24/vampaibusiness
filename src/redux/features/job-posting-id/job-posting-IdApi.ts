/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-object-type*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../api/apiSlice";


export const jobPostingIdApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    inviteTeamMemebr: builder.mutation({
      query: (data) => ({
        url: "/employer/team/team-invite",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          ToastNotification({
            title: result?.data?.message,
            description: "Team Memeber Invited Successfully",
            type: "success",
          });
        } catch (error: any) {
          ToastNotification({
            title: error?.error?.data?.error || error?.error?.error,
            description: error?.error?.data?.message || error?.error?.status,
            type: "error",
          });
        }
      },
    }),



    getInvitedTeamMembers: builder.query({
      query: (job_Id) => ({
        url: `/employer/team/team-invite`,
        method: "GET",
        params: { job_Id }, 
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          ToastNotification({
            title: error?.error?.data?.error || error?.error?.error,
            description: error?.error?.data?.message || error?.error?.status,
            type: "error",
          });
        }
      },
    }),


    deleteTeamMember: builder.mutation({
      query: (team_Id) => ({
        url: `/employer/team/team-invite`,
        method: "DELETE",
        params: { team_Id }, // Pass team_Id as a query parameter
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          ToastNotification({
            title: "Deleted",
            description: "Team Member Deleted successfully.",
            type: "error",
          });
        } catch (error: any) {
          ToastNotification({
            title: error?.error?.data?.error || error?.error?.error,
            description: error?.error?.data?.message || error?.error?.status,
            type: "error",
          });
        }
      },
    }),


    
   

  }),
});

export const {
  useInviteTeamMemebrMutation,
  useGetInvitedTeamMembersQuery,
  useDeleteTeamMemberMutation
 
} = jobPostingIdApi;
