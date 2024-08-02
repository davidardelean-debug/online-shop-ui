// services/products.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL, PRODUCTS_ENDPOINT } from "../constants";
import Product from "../entities/Product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products", "Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL + PRODUCTS_ENDPOINT,
    prepareHeaders: (headers) => {
      const token =
        window.localStorage.getItem("user") &&
        JSON.parse(window.localStorage.getItem("user")!).accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "",
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => `${id}`,
      providesTags: ["Products"],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...updatedProduct }) => ({
        url: `${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
