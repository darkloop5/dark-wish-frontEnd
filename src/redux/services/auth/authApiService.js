import { baseApi } from "../../api/baseApi";
export const authApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // LOGIN USER
    loginUser: build.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
    // CREATE USER
    createUser: build.mutation({
      query: (userData) => ({
        url: "/create-user",
        method: "POST",
        body: userData,
      }),
    }),
    // RESET USER DAILY LIMIT (NEW)
    resetUserDailyLimit: build.mutation({
      query: (userId) => ({
        url: "/reset-user-daily-limit",
        method: "POST",
        body: { userId },
      }),
    }),
  }),
});

export const { useLoginUserMutation, useCreateUserMutation ,useResetUserDailyLimitMutation} = authApiService;
