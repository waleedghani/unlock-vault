import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/URL";
import {
  CHANGE_PASSWORD,
  CONNECT_WALLET_PROFILE,
  FORGET_PASSWORD,
  LOGIN_URL,
  MY_TOKENS,
  REGISTER_URL,
  RESEND_OTP,
  RESET_PASSWORD,
  UPDATE_PROFILE,
  VERIFY_ACCOUNT,
  VERIFY_PASSWORD_OTP,
  XUMM_LOGIN,
  XUMM_STATUS,
} from "../../utils/endpoints";

const AuthServices = createApi({
  reducerPath: "AuthServices",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const reducers = getState();
      const token = reducers?.AuthReducer?.userToken;
      headers.set("Accept", "application/json");
      // if (endpoint !== REGISTER_URL && token) {
      //   headers.set("authorization", `Bearer ${token}`);
      // }
      headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["editInfo", "quiz"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: LOGIN_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["editInfo"],
    }),
    xummLogin: build.query({
      query: (data) => ({
        url: XUMM_LOGIN,
        method: "GET",
        params: data,
      }),
    }),
    authRegister: build.mutation({
      query: (data) => ({
        url: REGISTER_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["editInfo"],
    }),
    verifyAccount: build.mutation({
      query: (data) => ({
        url: VERIFY_ACCOUNT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["editInfo"],
    }),
    verifyPasswordOtp: build.mutation({
      query: (data) => ({
        url: VERIFY_PASSWORD_OTP,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["editInfo"],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: FORGET_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: RESET_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: CHANGE_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: build.mutation({
      query: (data) => ({
        url: RESEND_OTP,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: UPDATE_PROFILE,
        method: "POST",
        body: data,
      }),
    }),
    changeProfilePassword: build.mutation({
      query: (data) => ({
        url: CHANGE_PASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    xummStatus: build.query({
      query: ({ id }) => ({
        url: `${XUMM_STATUS}/${id}`,
        method: "GET",
      }),
    }),
    connectWalletViaProfile: build.mutation({
      query: ({ id, data }) => ({
        url: `${CONNECT_WALLET_PROFILE}/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    MyTokens: build.query({
      query: () => ({
        url: `${MY_TOKENS}`,
        method: "GET",
      }),
    }),
  }),
});

export default AuthServices;

export const {
  useAuthRegisterMutation,
  useLoginMutation,
  useVerifyAccountMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useResendOtpMutation,
  useVerifyPasswordOtpMutation,
  useUpdateProfileMutation,
  useChangeProfilePasswordMutation,
  useLazyXummLoginQuery,
  useLazyXummStatusQuery,
  useConnectWalletViaProfileMutation,
  useMyTokensQuery,
} = AuthServices;
