import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAccount } from './loginAPI';

const initialState = {
  error: '',
  status: 'idle',
};

export const addUserAsync = createAsyncThunk(
  'login/createAccount',
  async (user) => {
    const response = await createAccount(user);
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
