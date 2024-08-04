import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, PRODUCT_CATEGORY_ENDPOINT } from "../constants";
import ProductCategory from "../entities/ProductCategory";
import { RootState } from "../store";

export const productCategoriesApi = createApi({
  reducerPath: "productCategoriesApi",
  tagTypes: ["Product Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL + PRODUCT_CATEGORY_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProductCategories: builder.query<ProductCategory[], void>({
      query: () => "",
      providesTags: ["Product Categories"],
    }),
  }),
});

export const { useGetProductCategoriesQuery } = productCategoriesApi;
