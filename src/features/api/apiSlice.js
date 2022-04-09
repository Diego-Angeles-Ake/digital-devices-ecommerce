import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ecommerce-api-react.herokuapp.com/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({ url: '/products', method: 'get' }),
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'get',
      }),
    }),
    getCategories: builder.query({
      query: () => ({ url: '/products/categories', method: 'get' }),
    }),
    getUserCart: builder.query({
      query: () => ({
        url: '/cart',
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
      providesTags: ['Cart'],
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        url: '/cart',
        method: 'post',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: product,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateProductInCart: builder.mutation({
      query: (product) => ({
        url: '/cart',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: product,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeProductFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'del',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetUserCartQuery,
  useAddProductToCartMutation,
  useUpdateProductInCartMutation,
  useRemoveProductFromCartMutation,
} = apiSlice;
