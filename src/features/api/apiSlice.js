import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ecommerce-api-react.herokuapp.com/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().login.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Cart', 'Purchase'],
  /* --------------------------- products endpoints --------------------------- */
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
    /* -------------------------- categories endpoints -------------------------- */
    getCategories: builder.query({
      query: () => ({ url: '/products/categories', method: 'get' }),
    }),
    /* ----------------------------- cart endpoints ----------------------------- */
    getUserCart: builder.query({
      query: () => ({
        url: '/cart',
        method: 'get',
      }),
      providesTags: ['Cart'],
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        url: '/cart',
        method: 'post',
        body: product,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateProductInCart: builder.mutation({
      query: (product) => ({
        url: '/cart',
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeProductFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    /* --------------------------- purchase endpoints --------------------------- */
    purchaseCart: builder.mutation({
      query: (purchase) => ({
        url: '/purchases',
        method: 'POST',
        body: purchase,
      }),
      invalidatesTags: ['Purchase'],
    }),
    getUserPurchases: builder.query({
      query: () => ({
        url: '/purchases',
        method: 'get',
      }),
      providesTags: ['Purchase'],
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
  usePurchaseCartMutation,
  useGetUserPurchasesQuery,
} = apiSlice;
