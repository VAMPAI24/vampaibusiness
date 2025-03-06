/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-object-type*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import ToastNotification from "@/components/shared/ToastNotification";
import { apiSlice } from "../api/apiSlice";





interface PaymentResponse {
  error: string;
  message: string;
  data: any;
  client_secret: string;
}


interface PaymentRequestDATA {
  error: string;
  message: string;
  paymentIntentId: string;
}


interface PaymentRequest {
  email: string;
  amount: number;
  product: string;
  currency: string;
  paymentPlan: string;
  interval: string;
  business_platform: string;
}


export const pricingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlan: builder.query({
      query: ({ currency }) => ({
        url: `/employer/products?currency=${currency}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
    
          // ToastNotification({
          //   title: result?.data?.message,
          //   description: "Products fetched successfully",
          //   type: "success",
          // });
        } catch (error: any) {
          ToastNotification({
            title: error?.error?.data?.error || error?.error?.error,
            description: error?.error?.data?.message || error?.error?.status,
            type: "error",
          });
        }
      },
    }),



    createPayment: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (body) => ({
        url: "/payment/create",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
    
   
        } catch (error: any) {
          ToastNotification({
            title: error?.error?.data?.error || error?.error?.error,
            description: error?.error?.data?.message || error?.error?.status,
            type: "error",
          });
        }
      },
    }),

    confirmPaymentData: builder.query<PaymentRequestDATA, { paymentIntentId: string }>({
      query: ({ paymentIntentId }) => ({
        url: `/payment/stripe/confirm?paymentIntentId=${paymentIntentId}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
    
          // Handle success (e.g., update cache or trigger further actions)
          console.log("Payment confirmation response:", result.data);
    
        } catch (error: any) {
          ToastNotification({
            title: error?.error?.data?.error || error?.error?.error,
            description: error?.error?.data?.message || error?.error?.status,
            type: "error",
          });
        }
      },
    }),
    
  }),
});

export const {
  useGetPlanQuery,
  useCreatePaymentMutation,
  useConfirmPaymentDataQuery
} = pricingApi;
