import { baseApi } from "../../api/baseApi";


export const numberApiService =  baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // =========================
    // GET ALL NUMBERS
    // =========================
    getNumbers: builder.query({
      query: () => "/number",
      providesTags: ["Numbers"],
    }),

    // =========================
    // GET BY USER ID
    // =========================
    getNumbersByUser: builder.query({
      query: (userId) => `/numbers/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "Numbers", id: userId },
      ],
    }),
     getOnlyNumbersByUser: builder.query({
      query: (userId) => `/numbers-only/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "Numbers", id: userId },
      ],
    }),

    // =========================
    // ADD NUMBER
    // =========================
    addNumber: builder.mutation({
      query: (data) => ({
        url: "/add-number",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Numbers"],
    }),

    // =========================
    // DELETE BY _id
    // =========================
    deleteNumber: builder.mutation({
      query: (id) => ({
        url: `/number/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Numbers"],
    }),

  }),
});

export const {
  useGetNumbersQuery,
  useGetNumbersByUserQuery,
  useAddNumberMutation,
  useDeleteNumberMutation,
  useGetOnlyNumbersByUserQuery
} = numberApiService;