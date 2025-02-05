/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-object-type*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postActiveJob: builder.mutation({
      query: (data) => ({
        url: "/employer/create-jobs",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          ToastNotification({
            title: result?.data?.message,
            description: "Job Created Successfully",
            type: "success",
          });
        } catch (error: any) {
          ToastNotification({
            title: error.error.data.error,
            description: error.error.data.message,
            type: "error",
          });
        }
      },
    }),

    saveJobToDraft: builder.mutation({
      query: (data) => ({
        url: "/employer/create-job-draft",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          ToastNotification({
            title: result?.data?.message,
            description: "Job Save To Draft Successfully",
            type: "success",
          });
        } catch (error: any) {
          ToastNotification({
            title: error.error.data.error,
            description: error.error.data.message,
            type: "error",
          });
        }
      },
    }),

    jobDescriptionAI: builder.mutation({
      query: (data) => ({
        url: "/employer/job-description",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // ToastNotification({
          //   title: result?.data?.message,
          //   description: "Job Save To Draft Successfully",
          //   type: "success",
          // });
        } catch (error: any) {
          ToastNotification({
            title: error.error.data.error,
            description: error.error.data.message,
            type: "error",
          });
        }
      },
    }),

    jobDescriptionAIRewite: builder.mutation({
      query: (data) => ({
        url: "/employer/job-description",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          ToastNotification({
            title: error.error.data.error,
            description: error.error.data.message,
            type: "error",
          });
        }
      },
    }),

    requiredSkill: builder.mutation({
      query: (data) => ({
        url: "/employer/skill",
        method: "POST",
        body: data,
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

    benefitDetailWriteAI: builder.mutation({
      query: (data) => ({
        url: "/employer/benefits",
        method: "POST",
        body: data,
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

    benefitDetailReWriteAI: builder.mutation({
      query: (data) => ({
        url: "/employer/benefits",
        method: "POST",
        body: data,
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

    getActiveJobs: builder.query({
      query: () => ({
        url: "/employer/active-jobs",
        method: "GET",
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

    getDraftJobs: builder.query({
      query: () => ({
        url: "/employer/jobs-draft",
        method: "GET",
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

    getByJobsId: builder.query({
      query: (id: string) => ({
        url: `/employer/jobs/${id}`,
        method: "GET",
        params: { Id: id },
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

    getShortlistedCandidate: builder.query({
      query: ({ id, status }) => ({
        url: `/employer/get-status/${id}?status=${status}`,
        method: "GET",
        // params: { status },
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

    getJobApplications: builder.query({
      query: (jobId: string) => ({
        url: `/employer/get-job-applications`,
        method: "GET",
        params: { job_id: jobId },
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

    getApplicationDetails: builder.query({
      query: (applicationId) => ({
        url: `/employer/get-application`,
        method: "GET",
        params: { application_id: applicationId },
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

    rankApplicants: builder.query({
      query: (jobId: string) => ({
        // url: "/employer/rank-applicants",
        url:"/employer/ai-rank-applicants",
        method: "GET",
        params: { job_id: jobId },
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

    employerCreateEvent: builder.mutation({
      query: (data) => ({
        url: "/employer/create-an-event",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          ToastNotification({
            title: result?.data?.message,
            description: "Event Created Successfully",
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

    getAllEvent: builder.query({
      query: ({ max_result }: { max_result: number }) => ({
        url: "/employer/get-all-event",
        method: "GET",
        params: { max_result },
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

    shortlistCandidate: builder.mutation({
      query: ({ id, status }) => ({
        url: `employer/status/${id}?status=${status}`,
        method: "PATCH",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

        

          ToastNotification({
            // title: result?.data?.message,
            title: "Shortlist",
            description: "Candidate Shorlisted",
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

    rejectCandidate: builder.mutation({
      query: ({ id }) => ({
        url: `employer/status/${id}?status=Rejected`,
        method: "PATCH",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          ToastNotification({
            // title: result?.data?.message,
            title: "Reject",
            description: "Candidate Rejected",
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

    getProfilePercentageCount: builder.query({
      query: () => ({
        url: "/employer/auth/get-employer",
        method: "GET",
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

    getJobsInDraft: builder.query({
      query: (id) => ({
        url: "/employer/jobs-draft-Id",
        method: "GET",
        params: { Id: id },
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

    updateJobInDraft: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employer/jobs-draft/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          ToastNotification({
            title: 'Success',
            description: 'Job draft updated successfully.',
            type: 'success',
          });
         
        } catch (error: any) {
          ToastNotification({
            title: 'Error',
            description:
              error?.data?.error || error?.error || 'Something went wrong',
            type: 'error',
          });
        }
      },
    }),


    searchTeamMember: builder.query({
      query: (search_terms) => ({
        url: "/employer/search-team",
        method: "GET",
        params: { search_terms },
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
  }),
});

export const {
  usePostActiveJobMutation,
  useSaveJobToDraftMutation,
  useJobDescriptionAIMutation,
  useJobDescriptionAIRewiteMutation,
  useRequiredSkillMutation,
  useBenefitDetailWriteAIMutation,
  useBenefitDetailReWriteAIMutation,
  useGetActiveJobsQuery,
  useGetDraftJobsQuery,
  useGetByJobsIdQuery,
  useGetShortlistedCandidateQuery,
  useGetJobApplicationsQuery,
  useGetApplicationDetailsQuery,
  useRankApplicantsQuery,
  useEmployerCreateEventMutation,
  useGetAllEventQuery,
  useShortlistCandidateMutation,
  useRejectCandidateMutation,
  useGetProfilePercentageCountQuery,
  useGetJobsInDraftQuery,
  useUpdateJobInDraftMutation,
  useSearchTeamMemberQuery
} = authApi;
