import { TAcademicSemester, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => {
        return {
          url: "/academic-semesters/pagination/query",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        console.log(response);
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-semesters",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
