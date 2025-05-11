import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../hooks/auth';
import { AxiosError } from 'axios';
import type { IUser, IUserState } from '../../type';

export interface FetchUserError {
  message?: string;
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
  success: false
};

export const fetchUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
  'user/fetchUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await authApi.get('/accounts/me/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      
      return response.data;
    } catch (err) {
      const error = err as AxiosError<FetchUserError>;
      return rejectWithValue(error.response?.data?.message || 'Foydalanuvchini olishda xatolik');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Xatolik yuz berdi';
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
