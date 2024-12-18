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
    //& Academic Semester Hooks
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
    getSinglelSemester: builder.query({
      query: (params) => {
        return {
          url: `/academic-semesters/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester>) => {
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
    updateAcademicSemester: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/academic-semesters/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [{ type: "academicsemester" }],
    }),

    //& Academic Faculty Hooks
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
    getSinglelAcademicFaculty: builder.query({
      query: (params) => {
        return {
          url: `/academic-faculty/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty>) => {
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
    updateAcademicFaculty: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/academic-faculty/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [{ type: "academicfaculty" }],
    }),

    //& Academic Department Hooks
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
    getSinglelAcademicDepertment: builder.query({
      query: (params) => {
        return {
          url: `/academic-depertment/${params}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepertment>) => {
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
    updateAcademicDepertment: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/academic-depertment/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [{ type: "academicdepertment" }],
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useGetSinglelSemesterQuery,
  useGetAllSemestersByPaginationQuery,
  useAddAcademicSemesterMutation,
  useUpdateAcademicSemesterMutation,

  useGetAllAcademicFacultyQuery,
  useGetSinglelAcademicFacultyQuery,
  useGetAllAcademicFacultyByPaginationQuery,
  useAddAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,

  useGetAllAcademicDepertmentQuery,
  useGetSinglelAcademicDepertmentQuery,
  useGetAllAcademicDepertmentByPaginationQuery,
  useAddAcademicDepertmentMutation,
  useUpdateAcademicDepertmentMutation,
} = academicManagementApi;
