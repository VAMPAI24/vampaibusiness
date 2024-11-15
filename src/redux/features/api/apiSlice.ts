import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { RootState } from "@/redux/app/store";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Access the token from the Redux state, assuming it's stored in `token`
      const token = (getState() as RootState).auth?.token || null;

      // Log the token for debugging
      console.log("Current Token:", token);

      // Set the Authorization header if token exists
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Users"],
  endpoints: () => ({}),
});

