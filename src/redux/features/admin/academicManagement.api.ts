import {
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters/pagination/query",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "academicsemester" }],
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-semesters",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "academicsemester" }],
    }),
    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-faculty/pagination/query",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "academicfaculty" }],
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-faculty",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "academicfaculty" }],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAllAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
} = academicManagementApi;
