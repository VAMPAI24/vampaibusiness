import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/redux/features/api/apiSlice"
import authSlice from "@/redux/features/auth/authSlice"



export const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
