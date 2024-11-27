import {
  TAssaignFaculty,
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

    //&  Faculty With Course hook Start
    getFacultyWCourse: builder.query({
      query: (id) => {
        return {
          url: `course/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAssaignFaculty>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "facultwithcourse" }],
    }),

    updateFacultyWCourse: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `course/${id}/assign-faculties`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [{ type: "facultwithcourse" }],
    }),

    deleteFacultyWCourse: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `course/${id}/remove-faculties`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: [{ type: "facultwithcourse" }],
    }),

    //& Offered Course hook Start

    getAllOfferedCourses: builder.query({
      query: () => {
        return {
          url: "offered-course",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "offeredCourse" }],
    }),
    getSinglelOfferedCourse: builder.query({
      query: (params) => {
        return {
          url: `offered-course/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "offeredCourse" }],
    }),
    getAllOfferedCourseByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/offered-course/pagination/query`,
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
      providesTags: [{ type: "offeredCourse" }],
    }),
    addOfferedCourse: builder.mutation({
      query: (data) => {
        return {
          url: "offered-course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "offeredCourse" }],
    }),
    updateOfferedCourse: builder.mutation({
      query: (data) => {
        return {
          url: `offered-course/${data?.id}`,
          method: "PATCH",
          body: data?.status,
        };
      },
      invalidatesTags: [{ type: "offeredCourse" }],
    }),
    deleteOfferedCourse: builder.mutation({
      query: (id) => ({
        url: `offered-course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "offeredCourse" }],
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

  useGetFacultyWCourseQuery,
  useUpdateFacultyWCourseMutation,
  useDeleteFacultyWCourseMutation,

  useGetAllOfferedCoursesQuery,
  useGetSinglelOfferedCourseQuery,
  useGetAllOfferedCourseByPaginationQuery,
  useAddOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
} = courseManagementApi;
