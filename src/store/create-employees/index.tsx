import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../hooks/auth';
import type { ICreateEmployee } from '../../type';
import type { AxiosError } from 'axios';

interface EmployeeAddState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: EmployeeAddState = {
  loading: false,
  success: false,
  error: null,
};

export const addNewEmployee = createAsyncThunk<void, ICreateEmployee, { rejectValue: string }>(
    'employee/add',
    async (data, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return rejectWithValue('Token mavjud emas');
        }
        await authApi.post('/employee/employees/', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        return rejectWithValue(error.response?.data?.message || 'Xodim qo‘shishda xatolik yuz berdi');
      }
    }
  );
  

const employeeAddSlice = createSlice({
  name: 'employeeAdd',
  initialState,
  reducers: {
    resetEmployeeStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addNewEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addNewEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Xatolik yuz berdi';
      });
  },
});

export const { resetEmployeeStatus } = employeeAddSlice.actions;

export default employeeAddSlice.reducer;
