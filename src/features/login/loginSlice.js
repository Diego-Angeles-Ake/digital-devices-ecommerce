import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAccount, logAccount } from './loginAPI';

const initialState = {
  error: '',
  logStatus: 'idle',
  signStatus: 'idle',
};

export const createUser = createAsyncThunk(
  'login/createAccount',
  async (user) => {
    const response = await createAccount(user);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response.data);
    return response.data;
  }
);

export const logUser = createAsyncThunk('login/logAccount', async (user) => {
  const response = await logAccount(user);
  // The value we return becomes the `fulfilled` action payload
  // console.log(response.data);
  return response.data;
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = '';
      state.logStatus = 'idle';
      state.signStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      /* --------------------------------- SignUp --------------------------------- */
      .addCase(createUser.pending, (state) => {
        state.signStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.signStatus = 'success';
        console.dir(action);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.signStatus = 'error';
        state.error = action.error.message;
      })
      /* ---------------------------------- LogIn --------------------------------- */
      .addCase(logUser.pending, (state) => {
        state.logStatus = 'loading';
      })
      .addCase(logUser.fulfilled, (state, action) => {
        state.logStatus = 'success';
        console.dir(action);
        localStorage.setItem('token', action.payload.data.token);
        localStorage.setItem(
          'user',
          `${action.payload.data.user.firstName} ${action.payload.data.user.lastName}`
        );
      })
      .addCase(logUser.rejected, (state, action) => {
        console.dir(action);
        state.logStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const { reset } = loginSlice.actions;
export const selectLogStatus = (state) => state.login.logStatus;
export const selectSignStatus = (state) => state.login.signStatus;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
