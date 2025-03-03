import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryResponseType } from "~/src/infrastructure/types/category.type";

export const categoryApi = createApi({
  /**
   * Unique key that identifies where the API slice will be mounted in Redux store
   * It must be unique across all APIs in your application
   */
  reducerPath: 'category-api',

  /**
   * Configuration for all REST API requests
   * Usually configured with fetchBaseQuery for REST APIs
   */
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://56d3-116-108-132-138.ngrok-free.app',
    prepareHeaders: (headers) => {
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    },
  }),

  /**
   * Defining the types of data that can be cached
   * Used for cache invalidation and updates
   */
  tagTypes: ['Categories'],

  /**
   * A builder function where you define your API endpoints
   * Each endpoint can be a query (GET) or mutation (POST/PUT/DELETE)
   */
  endpoints: (builder) => ({
    // postCategory:...,
    // putCategory:...,
    getCategoriesAsync: builder.query<CategoryResponseType, void>({
      query: () => 'api/v1/categories',
      providesTags: (result) => 
        result?.data
        ? [
            ...result.data.map(({ _id }) => ({
              type: 'Categories' as const,
              _id,
            })),
            { type: 'Categories', id: 'LIST' },
          ]
        : [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
})

export const { useGetCategoriesAsyncQuery } = categoryApi;