// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { buildUrl } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Убедитесь, что импортируете из react

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: (params) => {
        const url = buildUrl(`${BASE_URL}/products`, params); // Используем обновленный buildUrl
        console.log("Fetching data from:", url); // Выводит сформированный URL
        return url;
      },
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
