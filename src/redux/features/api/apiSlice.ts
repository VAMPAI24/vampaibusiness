import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";



export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    prepareHeaders: (headers, { getState, endpoint }) => {
      console.log(getState)
      const token = getState() || null;
      if (token) {
        return headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;

      // const accessToken = Cookies.get("accessToken");
      // const refreshToken = Cookies.get("refreshToken");

      // if (accessToken) {
      //   headers.set("access-token", accessToken);
      // }
      // if (refreshToken) {
      //   headers.set("refresh-token", refreshToken);
      // }
      return headers;
    },
  }),
   
  tagTypes: ["Users"],
  endpoints: () => ({}),

});

