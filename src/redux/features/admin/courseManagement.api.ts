import {
  TCourse,
  TQueryParam,
  TResponseRedux,
  TSemesterRegistration,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //& Semester Registration hook Start
    getAllRegisteredSemester: builder.query({
      query: () => {
        return {
          url: "/semester-registration",
          method: "GET",
        };
      },
      transformResponse: (
        response: TResponseRedux<TSemesterRegistration[]>
      ) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "semesterRegistration" }],
    }),
    getSinglelRegisteredSemester: builder.query({
      query: (params) => {
        return {
          url: `/semester-registration/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TSemesterRegistration>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "semesterRegistration" }],
    }),
    getAllRegisteredSemesterByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/semester-registration/pagination/query`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TSemesterRegistration[]>
      ) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "semesterRegistration" }],
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => {
        return {
          url: "/semester-registration",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "semesterRegistration" }],
    }),
    updateSemesterRegistration: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `semester-registration/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [{ type: "semesterRegistration" }],
    }),
    updateSemesterRegistrationStatus: builder.mutation({
      query: (data) => {
        return {
          url: `semester-registration/${data?.id}`,
          method: "PATCH",
          body: data?.status,
        };
      },
      invalidatesTags: [{ type: "semesterRegistration" }],
    }),
    //& Course hook Start
    getAllCourses: builder.query({
      query: () => {
        return {
          url: "course",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "course" }],
    }),
    getSinglelCourse: builder.query({
      query: (params) => {
        return {
          url: `course/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TCourse>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "course" }],
    }),
    getAllCoursesByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `course/pagination`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "course" }],
    }),
    addCourse: builder.mutation({
      query: (data) => {
        return {
          url: "course/create-course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "course" }],
    }),
    updateCourse: builder.mutation({
      query: (data) => {
        return {
          url: `course/${data?.id}`,
          method: "PATCH",
          body: data?.status,
        };
      },
      invalidatesTags: [{ type: "course" }],
    }),
  }),
});

export const {
  useGetAllRegisteredSemesterQuery,
  useGetSinglelRegisteredSemesterQuery,
  useGetAllRegisteredSemesterByPaginationQuery,
  useAddSemesterRegistrationMutation,
  useUpdateSemesterRegistrationMutation,
  useUpdateSemesterRegistrationStatusMutation,

  useGetAllCoursesQuery,
  useGetSinglelCourseQuery,
  useGetAllCoursesByPaginationQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
} = courseManagementApi;
