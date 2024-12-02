import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacultySchedule: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-courses/faculty-schedule",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "facultySchedule" }],
    }),

    updateCourseMarks: builder.mutation({
      query: (data) => {
        return {
          url: `/enrolled-courses/update-enrolled-course-marks`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [
        { type: "enrollCourse" },
        { type: "myOfferedCourse" },
        { type: "facultySchedule" },
      ],
    }),
  }),
});

export const { useGetFacultyScheduleQuery, useUpdateCourseMarksMutation } =
  facultyCourseManagementApi;
