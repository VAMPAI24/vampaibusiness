/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-object-type*/
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn } from "./authSlice";
import Cookies from "js-cookie";

// Define the error type
interface ApiError {
  error: {
    status: string;
    error: string;
    data: {
      error: string;
      message: string;
    };
  };
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              userSignUpInfo: result?.data?.data,
            })
          );
          ToastNotification({
            title: result?.data?.message,
            description: "Signed Up Successfully",
            type: "success",
          });
        } catch (error) {
          const apiError = error as ApiError; 
          console.log(apiError);
          ToastNotification({
            title: apiError?.error?.data?.error || apiError?.error?.error,
            description: apiError?.error?.data?.message || apiError?.error?.status,
            type: "error",
          });
        }
      },
    }),

    emailVerification: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/email-verification",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          ToastNotification({
            title: result?.data?.message,
            description: "Email Verification Successful",
            type: "success",
          });
        } catch (error) {
          const apiError = error as ApiError;
          console.log(apiError);
          ToastNotification({
            title: apiError?.error?.data?.error || apiError?.error?.error,
            description: apiError?.error?.data?.message || apiError?.error?.status,
            type: "error",
          });
        }
      },
    }),

    login: builder.mutation({
      query: ({ work_email, password }) => ({
        url: "/employer/auth/login",
        method: "POST",
        body: {
          work_email,
          password,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          ToastNotification({
            title: result?.data?.message,
            description: "Signed In Successfully",
            type: "success",
          });
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.data?.tokens?.access_token,
              refreshToken: result?.data?.data?.tokens?.refresh_token,
              userInfo: result?.data?.data?.user,
            })
          );
        } catch (error) {
          const apiError = error as ApiError; 
          console.log(apiError);
          ToastNotification({
            title: apiError?.error?.data?.error || apiError?.error?.error,
            description: apiError?.error?.data?.message || apiError?.error?.status,
            type: "error",
          });
        }
      },
    }),

    sendResetPasswordLink: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/password-link",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        
          ToastNotification({
            title: "Reset Password Successful",
            description: result?.data?.message,
            type: "success",
          });


        } catch (error) {
          const apiError = error as ApiError;
          console.log(apiError);
          ToastNotification({
            title: apiError?.error?.data?.error || apiError?.error?.error,
            description: apiError?.error?.data?.message || apiError?.error?.status,
            type: "error",
          });
        }
      },
    }),

    ResetPassword: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          ToastNotification({
            title: "Reset Password Successful",
            description: result?.data?.message,
            type: "success",
          });

          

         
        } catch (error) {
          const apiError = error as ApiError;
          console.log(apiError);
          ToastNotification({
            title: apiError?.error?.data?.error || apiError?.error?.error,
            description: apiError?.error?.data?.message || apiError?.error?.status,
            type: "error",
          });
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/update-profile",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          ToastNotification({
            title: result?.data?.message,
            description: "Update Profile In Successfully",
            type: "success",
          });
        } catch (error) {
          const apiError = error as ApiError;
          console.log(apiError);
          ToastNotification({
            title: apiError?.error?.data?.error || apiError?.error?.error,
            description: apiError?.error?.data?.message || apiError?.error?.status,
            type: "error",
          });
        }
      },
    }),


    getSingleEmployer: builder.query({
      query: () => ({
        url: "/employer/auth/get-employer",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          const apiError = error as ApiError; 
          console.log(apiError);
          ToastNotification({
            title: apiError?.error?.data?.error || apiError?.error?.error,
            description: apiError?.error?.data?.message || apiError?.error?.status,
            type: "error",
          });
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useEmailVerificationMutation,
  useLoginMutation,
  useSendResetPasswordLinkMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useGetSingleEmployerQuery,
} = authApi;
