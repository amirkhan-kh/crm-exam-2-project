import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../hooks/auth'; // axios instance
import { AxiosError } from 'axios';
import type { IUser, IUserState } from '../../type';

// Type uchun yangi interfeyslar
interface FetchUserError {
  message?: string;
}



const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = (token: string) => async (dispatch: any) => {
  dispatch({ type: 'user/fetchUser/pending' }); 
  try {
    const response = await authApi.get('/accounts/me/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    
    dispatch({ type: 'user/fetchUser/fulfilled', payload: response.data }); 
    
  } catch (err) {
    const error = err as AxiosError<FetchUserError>; 
    dispatch({
      type: 'user/fetchUser/rejected',
      payload: error.response?.data?.message || 'Foydalanuvchini olishda xatolik',
    });
  }
};

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
      .addCase('user/fetchUser/pending', (state) => {
        state.loading = true;
      })
      .addCase('user/fetchUser/fulfilled', (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase('user/fetchUser/rejected', (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
