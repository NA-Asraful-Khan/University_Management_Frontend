import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
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
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
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
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetAllStudentsByPaginationQuery,
  useAddStudentMutation,
} = userManagementApi;
