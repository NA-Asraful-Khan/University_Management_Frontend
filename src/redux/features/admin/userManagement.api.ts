import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => {
        return {
          url: "/students",
          method: "GET",
        };
      },
      providesTags: [{ type: "student" }],
    }),
    getAllStudentsByPagination: builder.query({
      query: () => {
        return {
          url: `/students/pagination`,
          method: "GET",
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
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetAllStudentsByPaginationQuery,
  useAddStudentMutation,
} = userManagementApi;
