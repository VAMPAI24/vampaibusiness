import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, PROD_BASE_URL } from "../constants";
// import { RootState } from "@/redux/app/store";
import { isLocalOrStaging } from "@/lib/utils";
import { clearSession, getSession } from "@/redux/app/cookies";
import ToastNotification from "@/components/shared/ToastNotification";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: BASE_URL,
    baseUrl: isLocalOrStaging() ? BASE_URL : PROD_BASE_URL,
    prepareHeaders: (headers, {}) => {
      // Access the token from the Redux state, assuming it's stored in `token`
      // const token = (getState() as RootState).auth?.token;
      const token = getSession()?.token;

      // Log the token for debugging
      // console.log("Current Token:", token); 

      // Set the Authorization header if token exists
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    // Custom response handler
    responseHandler: async (response) => {
      const abortController = new AbortController();

      if (response && response.status === 401) {
        if (abortController) {
          abortController.abort("User is unauthorized. Logging out...");
        }

        ToastNotification({
          title: "Session",
          description: "Session timed out, please login.",
          type: "error",
        });

        clearSession();
        window.location.href = "/sign-in";

        return;
      }

      // Check if the response is OK (status 200-299) and has a body
      if (response.ok) {
        try {
          const data = await response?.json();
          return data;
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      } else {
        throw new Error(`Request failed with status ${response?.status}`);
      }
    },
  }),

  tagTypes: ["Users"],
  endpoints: () => ({}),
});
