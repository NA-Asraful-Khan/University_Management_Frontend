import {
  TAdmin,
  TFaculty,
  TQueryParam,
  TResponseRedux,
  TStudent,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //& Student Hook Start
    getAllStudents: builder.query({
      query: () => {
        return {
          url: "/students",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "student" }],
    }),
    getSinglelStudent: builder.query({
      query: (params) => {
        return {
          url: `/students/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "student" }],
    }),
    getAllStudentsByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/students/pagination`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "student" }],
    }),
    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "student" }],
    }),
    updateStudent: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `students/${id}`,
          method: "PATCH",
          body: data, // Ensure `data` is a FormData object
        };
      },
      invalidatesTags: [{ type: "student" }],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "student" }],
    }),

    //& Faculty Hook Start
    getAllFaculty: builder.query({
      query: () => {
        return {
          url: "/faculty",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "faculty" }],
    }),
    getSinglelFaculty: builder.query({
      query: (params) => {
        return {
          url: `/faculty/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "faculty" }],
    }),
    getAllFacultyByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/faculty/pagination`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "faculty" }],
    }),
    addFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "faculty" }],
    }),
    updateFaculty: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `faculty/${id}`,
          method: "PATCH",
          body: data, // Ensure `data` is a FormData object
        };
      },
      invalidatesTags: [{ type: "faculty" }],
    }),
    deleteFaculty: builder.mutation({
      query: (id) => ({
        url: `faculty/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "faculty" }],
    }),

    //& Admin Hook Start
    getAllAdmin: builder.query({
      query: () => {
        return {
          url: "/admin",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "admin" }],
    }),
    getSinglelAdmin: builder.query({
      query: (params) => {
        return {
          url: `/admin/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "admin" }],
    }),
    getAllAdminByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/admin/pagination`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "admin" }],
    }),
    addAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-admin",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "admin" }],
    }),
    updateAdmin: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `admin/${id}`,
          method: "PATCH",
          body: data, // Ensure `data` is a FormData object
        };
      },
      invalidatesTags: [{ type: "admin" }],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "admin" }],
    }),

    changeUserStatus: builder.mutation({
      query: (id) => {
        return {
          url: `/users/change-status/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: [
        { type: "student" },
        { type: "faculty" }, // Add another type
        { type: "admin" }, // Add more types as needed
      ],
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetSinglelStudentQuery,
  useGetAllStudentsByPaginationQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  useGetAllFacultyQuery,
  useGetSinglelFacultyQuery,
  useGetAllFacultyByPaginationQuery,
  useAddFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,

  useGetAllAdminQuery,
  useGetSinglelAdminQuery,
  useGetAllAdminByPaginationQuery,
  useAddAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,

  useChangeUserStatusMutation,
} = userManagementApi;
