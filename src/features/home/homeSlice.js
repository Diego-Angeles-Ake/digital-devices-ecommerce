import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  min: 0,
  max: 0,
  name: '',
  category: '',
  products: [],
  displayedProducts: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    removeFilters: (state) => {
      state.displayedProducts = state.products.slice();
    },
    filterByCategory: (state, action) => {
      state.displayedProducts = state.products.filter((product) => {
        return product.category.name === action.payload;
      });
    },
    filterByName: (state, action) => {
      state.displayedProducts = state.products.filter((product) => {
        return product.title === action.payload;
      });
    },
    filterByPrice: (state, action) => {
      state.displayedProducts = state.products.filter((product) => {
        return (
          parseFloat(product.price) >= parseFloat(action.payload.min) &&
          parseFloat(product.price) <= parseFloat(action.payload.max)
        );
      });
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.displayedProducts = action.payload;
    },
  },
});
export const {
  setProducts,
  filterByCategory,
  removeFilters,
  filterByPrice,
  filterByName,
} = homeSlice.actions;
export const selectDisplayedProducts = (state) => state.home.displayedProducts;

export default homeSlice.reducer;
