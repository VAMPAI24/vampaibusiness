/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-object-type*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    cvscoring: builder.mutation({
      query: (data) => ({
        url: "/employer/analyze",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          ToastNotification({
            title: result?.data?.message,
            description: "Cv Scored Successfully",
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


  }),
});

export const {
  useCvscoringMutation
} = authApi;
