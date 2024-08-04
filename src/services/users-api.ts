import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_ENDPOINT, BASE_API_URL } from "../constants";
import { AuthState } from "../entities/AuthState";
import { UserLoginData } from "../entities/UserLoginData";
import { setCredentials } from "../slices/auth-slice";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL + AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, UserLoginData>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          alert("Login failed");
        }
      },
    }),
  }),
});

export const { useLoginMutation } = usersApi;
