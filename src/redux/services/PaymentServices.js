import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/URL";

const PaymentServices = createApi({
  reducerPath: "PaymentServices",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.AuthReducer?.userToken;
      headers.set("Accept", "application/json");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["subscription"],
  endpoints: (build) => ({
    // GET subscription plans
    paymentHistory: build.query({
      query: () => ({
        url: `/auth/payments/history`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    checkPaymentStatus: build.query({
      query: ({ uuid }) => ({
        url: `/auth/payments/status/${uuid}`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
  }),
});

export default PaymentServices;
export const { usePaymentHistoryQuery, useLazyCheckPaymentStatusQuery } =
  PaymentServices;
