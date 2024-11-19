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
    }),
    getAllStudentsByPagination: builder.query({
      query: () => {
        return {
          url: `/students/pagination`,
          method: "GET",
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetAllStudentsByPaginationQuery,
  useAddStudentMutation,
} = userManagementApi;
