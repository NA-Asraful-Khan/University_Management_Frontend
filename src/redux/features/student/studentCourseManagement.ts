import { TMyOfferedCourse, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-course/my-offered-course",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TMyOfferedCourse[]>) => {
        return response?.data;
      },
      providesTags: [{ type: "myOfferedCourse" }],
    }),
  }),
});

export const { useGetMyOfferedCourseQuery } = studentCourseManagementApi;
