import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/URL";
import { ALL_LIVE_STREAM } from "../../utils/endpoints";

const LiveStreamServices = createApi({
  reducerPath: "LiveStreamServices",
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
  tagTypes: ["liveStream"],

  endpoints: (build) => ({
    getAllLiveStreams: build.query({
      query: (params) => ({
        url: `${ALL_LIVE_STREAM}`,
        method: "GET",
        params,
      }),
      providesTags: ["liveStream"],
    }),

    joinLiveStream: build.mutation({
      query: ({ id }) => ({
        url: `${ALL_LIVE_STREAM}/${id}/join`,
        method: "POST",
      }),
      invalidatesTags: ["liveStream"],
    }),

    leaveLiveStream: build.mutation({
      query: ({id}) => ({
        url: `${ALL_LIVE_STREAM}/${id}/leave`,
        method: "POST",
      }),
      invalidatesTags: ["liveStream"],
    }),
  }),
});

export default LiveStreamServices;

export const {
  useGetAllLiveStreamsQuery,
  useJoinLiveStreamMutation,
  useLeaveLiveStreamMutation,
} = LiveStreamServices;
