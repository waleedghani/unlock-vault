import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/URL";
import { ALL_COURSES } from "../../utils/endpoints"; // ✅ Only importing ALL_COURSES

const CourseServices = createApi({
  reducerPath: "CourseServices",
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
  tagTypes: ["course"],

  endpoints: (build) => ({
    // ✅ Get all courses
    getAllCourses: build.query({
      query: (params) => ({
        url: ALL_COURSES,
        method: "GET",
        params,
      }),
      providesTags: ["course"],
    }),

    // ✅ Get single course details
    getCourseDetails: build.query({
      query: (id) => ({
        url: `${ALL_COURSES}/${id}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    getCourseSections: build.query({
      query: (id) => ({
        url: `/courses/section/${id}`,
        method: "GET",
      }),
    }),
    coursePurchase: build.mutation({
      query: ({ id }) => ({
        url: `/auth/courses/${id}/purchase`,
        method: "POST",
      }),
      invalidatesTags: ["liveStream"],
    }),
    myCourses: build.query({
      query: () => ({
        url: `/auth/my-courses`,
        method: "Get",
      }),
      invalidatesTags: ["liveStream"],
    }),
  }),
});

export default CourseServices;

// ✅ Export React hooks
export const {
  useGetAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseSectionsQuery,
  useCoursePurchaseMutation,
  useMyCoursesQuery,
} = CourseServices;
