// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// type UserInfoProps = {
//   first_name: string;
//   last_name: string;
//   work_email: string;
//   phone_Number: string;
//   Position_in_company: string;
//   country: string;
//   company_name: string;
//   company_website: string;
//   No_Employees: "1-10" | "11-50" | "51-100" | "100+" | "";
//   industry: string;
//   company_bio: string;
// };

// interface AuthState {
//   token: string;
//   refreshToken: string;
//   userInfo: UserInfoProps | null;
//   userSignUpInfo: string | null;
// }

// const initialState: AuthState = {
//   token:
//     typeof window !== "undefined" && localStorage.getItem("token")
//       ? JSON.parse(localStorage.getItem("token") as string)
//       : "",
//   refreshToken:
//     typeof window !== "undefined" && localStorage.getItem("refreshToken")
//       ? JSON.parse(localStorage.getItem("refreshToken") as string)
//       : "",
//   userInfo:
//     typeof window !== "undefined" && localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo") as string)
//       : null,
//   userSignUpInfo:
//     typeof window !== "undefined" && localStorage.getItem("userSignUpInfo")
//       ? JSON.parse(localStorage.getItem("userSignUpInfo") as string)
//       : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     userRegistration: (
//       state,
//       action: PayloadAction<{ userSignUpInfo: string }>
//     ) => {
//       state.userSignUpInfo = action.payload.userSignUpInfo;
//       localStorage.setItem("userSignUpInfo", JSON.stringify(action.payload.userSignUpInfo));
//     },
//     userLoggedIn: (
//       state,
//       action: PayloadAction<{
//         accessToken: string;
//         refreshToken: string;
//         userInfo: UserInfoProps;
//       }>
//     ) => {
//       state.token = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//       state.userInfo = action.payload.userInfo;
//       localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
//       localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken));
//       localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
//     },
//     userLogout: (state: AuthState) => {
//       state.userInfo = null;
//       state.token = "";
//       state.refreshToken = "";
//       localStorage.removeItem("userInfo");
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//     },
//   },
// });

// export const { userRegistration, userLoggedIn, userLogout } = authSlice.actions;

// export default authSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setSession } from "../api/cookies";

// Define user info type
type UserInfoProps = {
  first_name: string;
  last_name: string;
  work_email: string;
  phone_Number: string;
  Position_in_company: string;
  country: string;
  company_name: string;
  company_website: string;
  No_Employees: "1-10" | "11-50" | "51-100" | "100+" | "";
  industry: string;
  company_bio: string;
};

interface AuthState {
  token: string;
  refreshToken: string;
  userInfo: UserInfoProps | null;
  userSignUpInfo: string | null;
}

// Function to generate expiration date for 3 hours from now
const getExpirationDate = () => {
  return new Date(new Date().getTime() + 3 * 60 * 60 * 1000); // 3 hours from now
};

// Initialize state with cookies if available
const initialState: AuthState = {
  token: Cookies.get("token") || "",
  refreshToken: Cookies.get("refreshToken") || "",
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") as string)
    : null,
  userSignUpInfo: Cookies.get("userSignUpInfo") || null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Register user info and save it in cookies
    userRegistration: (
      state,
      action: PayloadAction<{ userSignUpInfo: string }>
    ) => {
      state.userSignUpInfo = action.payload.userSignUpInfo;
      // Set expiration to 3 hours from now
      Cookies.set("userSignUpInfo", action.payload.userSignUpInfo, {
        expires: getExpirationDate(),
      });
    },
    // User logged in (save token, refreshToken, userInfo in cookies)
    userLoggedIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        userInfo: UserInfoProps;
      }>
    ) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userInfo = action.payload.userInfo;

      // handle access tokens, refresh & timer
      setSession(action.payload.accessToken);
      setSession(action.payload.refreshToken, "refresh_tk_session");

      // Set expiration to 3 hours from now
      Cookies.set("token", action.payload.accessToken, {
        expires: getExpirationDate(),
      });
      Cookies.set("refreshToken", action.payload.refreshToken, {
        expires: getExpirationDate(),
      });
      Cookies.set("userInfo", JSON.stringify(action.payload.userInfo), {
        expires: getExpirationDate(),
      });
    },

    // User logged out (clear cookies)
    userLogout: (state: AuthState) => {
      state.userInfo = null;
      state.token = "";
      state.refreshToken = "";

      // Remove cookies
      Cookies.remove("userInfo");
      // Cookies.remove("token");
      // Cookies.remove("refreshToken");

      // remove the values above
      Cookies.remove("__session");
      Cookies.remove("refresh_tk_session");
    },
  },
});

export const { userRegistration, userLoggedIn, userLogout } = authSlice.actions;

export default authSlice.reducer;
