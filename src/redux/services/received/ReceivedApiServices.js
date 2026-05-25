import { baseApi } from "../../api/baseApi";

export const ReceivedApiServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add Received
    addReceived: builder.mutation({
      query: (data) => ({
        url: "/add-received",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Received"],
    }),

    // Get Received
    getReceived: builder.query({
      query: ({ userId, filter }) => ({
        url: `/received/${userId}?filter=${filter}`,
        method: "GET",
      }),
      providesTags: ["Received"],
    }),

  }),
});

export const {
  useAddReceivedMutation,
  useGetReceivedQuery,
} = ReceivedApiServices;