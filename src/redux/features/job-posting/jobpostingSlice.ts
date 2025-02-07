import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  postId: string | null;
  showJobSuccess: boolean;
}

const initialState: AuthState = {
  postId: "",
  showJobSuccess: false,
};

// Auth slice
const jobPostSlice = createSlice({
  name: "jobpost",
  initialState,
  reducers: {
    setCurrJobPost: (
      state,
      action: PayloadAction<{
        postId: string;
        showJobSuccess: boolean;
      }>
    ) => {
      state.postId = action.payload.postId;
      state.showJobSuccess = action.payload.showJobSuccess;
    },
  },
});

export const { setCurrJobPost } = jobPostSlice.actions;

export default jobPostSlice.reducer;
