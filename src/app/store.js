import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import homeReducer from '../features/home/homeSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
