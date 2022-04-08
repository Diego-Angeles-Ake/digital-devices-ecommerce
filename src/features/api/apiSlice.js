import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://ecommerce-api-react.herokuapp.com/api/v1',
  }),
  endpoints(build) {
    return {
      query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
      mutation: build.mutation({
        query: () => ({ url: '/mutation', method: 'post' }),
      }),
      getAllProducts: build.query({
        query: () => ({ url: '/products', method: 'get' }),
      }),
      getProductById: build.query({
        query: (productId) => ({
          url: `/products/${productId}`,
          method: 'get',
        }),
      }),
      getCategories: build.query({
        query: () => ({ url: '/products/categories', method: 'get' }),
      }),
    };
  },
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = apiSlice;
