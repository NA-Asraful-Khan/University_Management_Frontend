import {
  TAcademicDepertment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: () => {
        return {
          url: "/academic-semesters",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "academicsemester" }],
    }),
    getAllSemestersByPagination: builder.query({
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
      query: () => {
        return {
          url: "/academic-faculty",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "academicfaculty" }],
    }),
    getAllAcademicFacultyByPagination: builder.query({
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
    getAllAcademicDepertment: builder.query({
      query: () => {
        return {
          url: "/academic-depertment",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepertment[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "academicdepertment" }],
    }),
    getAllAcademicDepertmentByPagination: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-depertment/pagination/query",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepertment[]>) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      },
      providesTags: [{ type: "academicdepertment" }],
    }),
    addAcademicDepertment: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-depertment",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "academicdepertment" }],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useGetAllSemestersByPaginationQuery,
  useAddAcademicSemesterMutation,
  useGetAllAcademicFacultyQuery,
  useGetAllAcademicFacultyByPaginationQuery,
  useAddAcademicFacultyMutation,
  useGetAllAcademicDepertmentQuery,
  useGetAllAcademicDepertmentByPaginationQuery,
  useAddAcademicDepertmentMutation,
} = academicManagementApi;
