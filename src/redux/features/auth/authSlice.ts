import { PayloadAction, createSlice } from "@reduxjs/toolkit";


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



const initialState: AuthState = {
  token: 
    typeof window !== "undefined" && localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token") as string)
      : "",
  refreshToken: 
    typeof window !== "undefined" && localStorage.getItem("refreshToken")
      ? JSON.parse(localStorage.getItem("refreshToken") as string)
      : "",
  userInfo:
    typeof window !== "undefined" && localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : null,
  userSignUpInfo:
    typeof window !== "undefined" && localStorage.getItem("userSignUpInfo")
      ? JSON.parse(localStorage.getItem("userSignUpInfo") as string)
      : null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (
      state,
      action: PayloadAction<{ userSignUpInfo: string }>
    ) => {
      state.userSignUpInfo = action.payload.userSignUpInfo;
      localStorage.setItem("userSignUpInfo", JSON.stringify(action.payload.userSignUpInfo));
    },
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
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken));
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
    },
    userLogout: (state: AuthState) => {
      state.userInfo = null;
      state.token = "";
      state.refreshToken = "";
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { userRegistration, userLoggedIn, userLogout } = authSlice.actions;

export default authSlice.reducer;
