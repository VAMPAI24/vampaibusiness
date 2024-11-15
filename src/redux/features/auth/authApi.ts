/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-object-type*/
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn } from "./authSlice";



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

          // Navigate to the dashboard
          // window.location.href = "/dashboard";

          

          ToastNotification({
            title: result?.data?.message,
            description: "Signed Up Successfully",
            type: "success",
          });
        } catch (error: any) {
          console.log(error);
          ToastNotification({
            title: error?.error?.data?.error || "Network Error" ,
            description: error?.error?.data?.message || "Kindly Check your Network",
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
            description: "Email Verification Successfull",
            type: "success",
          });
        } catch (error: any) {
          console.log(error);
          ToastNotification({
            title: error?.error?.data?.error || "Network Error" ,
            description: error?.error?.data?.message || "Kindly Check your Network",
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
        } catch (error: any) {
          console.log(error);
          ToastNotification({
            title: error?.error?.data?.error || "Network Error" ,
            description: error?.error?.data?.message || "Kindly Check your Network",
            type: "error",
          });
        }
      },
    }),

    sendResetPasswordLink: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/password-link",  
        method: "POST",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;


          // console.log(result)
          ToastNotification({
            title: "Reset Password Successful",
            description: result?.data?.message,
            type: "success",
          });


        } catch (error: any) {
          console.log(error);
          ToastNotification({
            title: error?.error?.data?.error || "Network Error" ,
            description: error?.error?.data?.message || "Kindly Check your Network",
            type: "error",
          });
        }
      },
    }),


    ResetPassword: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/reset-password",  
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;


          // console.log(result)
          ToastNotification({
            title: "Reset Password Successful",
            description: result?.data?.message,
            type: "success",
          });


        } catch (error: any) {
          console.log(error);
          ToastNotification({
            title: error?.error?.data?.error || "Network Error" ,
            description: error?.error?.data?.message || "Kindly Check your Network",
            type: "error",
          });
        }
      },
    }),



    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/employer/auth/update-profile",  
        method: "PATCH",
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;


          console.log(result)
          ToastNotification({
            title: result?.data?.message,
            description: "Signed In Successfully",
            type: "success",
          });


        } catch (error: any) {
          console.log(error);
          ToastNotification({
            title: error?.error?.data?.error || "Network Error" ,
            description: error?.error?.data?.message || "Kindly Check your Network",
            type: "error",
          });
        }
      },
    }),



    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useEmailVerificationMutation, useLoginMutation, useSendResetPasswordLinkMutation, useResetPasswordMutation, useUpdateProfileMutation, useLogOutQuery } =
  authApi;
