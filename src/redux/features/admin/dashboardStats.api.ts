import {
  TResponseRedux,
  TSemesterRegistration,
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
        response: TResponseRedux<TSemesterRegistration[]>
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
  useGetAdminDashboardStatsQuery
} = dashboardStatsApi;
