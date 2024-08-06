import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, ORDERS_ENDPOINT } from "../constants";
import { Order } from "../entities/Order";
import { RootState } from "../store";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL + ORDERS_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addOrder: builder.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: "",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useAddOrderMutation } = ordersApi;
