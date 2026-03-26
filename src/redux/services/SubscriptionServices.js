import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/URL";
import { CONNECT_WALLET, PAYMENT_STATUS, VENDOR } from "../../utils/endpoints";

const SubscriptionServices = createApi({
  reducerPath: "SubscriptionServices",
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
    getAllSubscriptions: build.query({
      query: () => ({
        url: `/subscription-plans`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    subscriptionPayment: build.mutation({
      query: ({ plan }) => ({
        url: `/auth/subscription-plans/${plan}/subscribe`,
        method: "POST",
      }),
      providesTags: ["subscription"],
    }),
    subscriptionVendor: build.mutation({
      query: ({ data }) => ({
        url: VENDOR,
        method: "POST",
        body: data,
      }),
      providesTags: ["subscription"],
    }),
    connectWallet: build.mutation({
      query: ({ vendor_id }) => ({
        url: `${CONNECT_WALLET + vendor_id}/connect-wallet`,
        method: "POST",
      }),
      providesTags: ["subscription"],
    }),
    connectWalletStatus: build.query({
      query: ({ vendor_id }) => ({
        url: `${CONNECT_WALLET + vendor_id}/wallet-status`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    vendorConnect: build.mutation({
      query: ({ vendor_id, data }) => ({
        url: `${CONNECT_WALLET + vendor_id}/subscribe`,
        method: "POST",
        body: data,
      }),
      providesTags: ["subscription"],
    }),
    paymentStatus: build.query({
      query: ({ uuid }) => ({
        url: `${PAYMENT_STATUS}${uuid}`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
  }),
});

export default SubscriptionServices;

export const {
  useGetAllSubscriptionsQuery,
  useSubscriptionPaymentMutation,
  useSubscriptionVendorMutation,
  useConnectWalletMutation,
  useLazyConnectWalletStatusQuery,
  useVendorConnectMutation,
  useLazyPaymentStatusQuery,
} = SubscriptionServices;
