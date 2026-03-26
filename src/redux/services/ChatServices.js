import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/URL";

const ChatService = createApi({
  reducerPath: "ChatService",
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
  tagTypes: ["chatMessages", "chatReactions"],
  endpoints: (build) => ({
    // ✅ 1. Fetch stream messages (GET)
    getMessages: build.query({
      query: ({ streamId }) => ({
        url: `/auth/streams/${streamId}/messages`,
        method: "GET",
      }),
      providesTags: ["chatMessages"],
    }),

    // ✅ 2. Send message (POST)
    sendMessage: build.mutation({
      query: ({ streamId, data }) => ({
        url: `/auth/streams/${streamId}/messages`,
        method: "POST",
        body: data, // { message: "..." }
      }),
      invalidatesTags: ["chatMessages"],
    }),

    // ✅ 3. Send reaction (POST)
    sendReaction: build.mutation({
      query: ({ streamId, data }) => ({
        url: `/auth/streams/${streamId}/reactions`,
        method: "POST",
        body: data, // { reaction: "❤️" or similar }
      }),
      invalidatesTags: ["chatReactions"],
    }),
  }),
});

export default ChatService;

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
  useSendReactionMutation,
} = ChatService;
