import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../hooks/auth';
import type { AxiosError } from 'axios';
import type {  IEmployee, IEmployeeState } from '../../type';

export const fetchEmployeesByBranch = createAsyncThunk<IEmployee[], number, { rejectValue: string }>(
  'employee/fetchByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await authApi.get(`/employee/employees/branch/${branchId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.results;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || 'Xodimlarni olishda xatolik yuz berdi');
    }
  }
);

const initialState: IEmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder
      .addCase(fetchEmployeesByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeesByBranch.fulfilled, (state, action: PayloadAction<IEmployee[]>) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Xatolik yuz berdi';
      });

    
  },
});

export default employeeSlice.reducer;