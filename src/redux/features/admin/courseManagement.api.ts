import {
  TQueryParam,
  TResponseRedux,
  TSemesterRegistration,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      query: (data) => {
        return {
          url: `/semester-registration/${data?.id}`,
          method: "PATCH",
          body: data?.status,
        };
      },
      invalidatesTags: [{ type: "semesterRegistration" }],
    }),
  }),
});

export const {
  useGetAllRegisteredSemesterQuery,
  useGetSinglelRegisteredSemesterQuery,
  useGetAllRegisteredSemesterByPaginationQuery,
  useAddSemesterRegistrationMutation,
  useUpdateSemesterRegistrationMutation,
} = courseManagementApi;
