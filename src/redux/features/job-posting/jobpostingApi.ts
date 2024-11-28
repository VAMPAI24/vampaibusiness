/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-object-type*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../api/apiSlice";
import { AnyARecord } from "dns";


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
            title: error.error.data.error,
            description: error.error.data.message,
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
            title: error.error.data.error,
            description: error.error.data.message,
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
            title: error.error.data.error,
            description: error.error.data.message,
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
            title: error.error.data.error,
            description: error.error.data.message,
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
            title: error.error.data.error,
            description: error.error.data.message,
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
  useGetDraftJobsQuery

} = authApi;
