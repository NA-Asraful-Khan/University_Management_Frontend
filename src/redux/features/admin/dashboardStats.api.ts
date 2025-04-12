import {
  TDashboard,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const dashboardStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardStats: builder.query({
      query: () => {
        return {
          url: "/dashboard/admin",
          method: "GET",
        };
      },
      transformResponse: (
        response: TResponseRedux<TDashboard>
      ) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "dashboardStats" }],
    }),
    getFacultyDashboardStats: builder.query({
      query: () => {
        return {
          url: "/dashboard/faculty",
          method: "GET",
        };
      },
      transformResponse: (
        response: TResponseRedux<TDashboard>
      ) => {
        return {
          data: response.data,
        };
      },
      providesTags: [{ type: "dashboardStats" }],
    }),
  }),
});

export const {
  useGetAdminDashboardStatsQuery,
  useGetFacultyDashboardStatsQuery
} = dashboardStatsApi;
