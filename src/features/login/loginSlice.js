import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAccount, logAccount } from './loginAPI';

const initialState = {
  showLogin: false,
  error: '',
  logStatus: 'idle',
  signStatus: 'idle',
  token: localStorage.getItem('token'),
};

export const createUser = createAsyncThunk(
  'login/createAccount',
  async (user) => {
    const response = await createAccount(user);
    return response.data;
  }
);

export const logUser = createAsyncThunk('login/logAccount', async (user) => {
  const response = await logAccount(user);
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
    openLogIn: (state) => {
      state.showLogin = true;
    },
    closeLogIn: (state) => {
      state.showLogin = false;
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
        state.token = action.payload.data.token;
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

export const { reset, openLogIn, closeLogIn } = loginSlice.actions;
export const selectLogStatus = (state) => state.login.logStatus;
export const selectSignStatus = (state) => state.login.signStatus;
export const selectError = (state) => state.login.error;
export const selectShowLogIn = (state) => state.login.showLogin;

export default loginSlice.reducer;
