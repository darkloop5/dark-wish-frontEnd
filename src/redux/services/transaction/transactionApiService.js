import { baseApi } from "../../api/baseApi";

export const transactionApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ======================
    // GET ALL TRANSACTIONS
    // ======================

    getTransactions: builder.query({
      query: (userId) => ({
        url: `/transactions?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),

    // ======================
    // GET TOTAL SEND
    // ======================

    getTotalSend: builder.query({
      query: ({ userId, accountNumber, walletType }) => ({
        url: `/total-send`,
        method: "GET",
        params: {
          userId,
          accountNumber,
          walletType,
        },
      }),
      providesTags: ["Transactions"],
    }),

    // ======================
    // ADD TRANSACTION
    // ======================
    getUserTotalAmount: builder.query({
      query: (userId) => ({
        url: `/user-total-amount`,
        method: "GET",
        params: { userId },
      }),
      providesTags: ["Transactions"],
    }),
    addTransaction: builder.mutation({
      query: (data) => ({
        url: "/add-transaction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useGetTotalSendQuery,
  useGetUserTotalAmountQuery, 
} = transactionApiService;
