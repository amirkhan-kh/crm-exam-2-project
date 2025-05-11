import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store-config';
import { authApi } from '../../hooks/auth';
import type { AppDispatch } from '../store-config';
import type { AxiosError } from 'axios';

export interface CompanyType {
  id: number;
  name: string;
  address: string;
}

interface CompanyState {
  company: CompanyType | null;
  loadingg: boolean;
  errorr: string | null;
}

const initialState: CompanyState = {
  company: null,
  loadingg: false,
  errorr: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyStart(state) {
      state.loadingg = true;
      state.errorr = null;
    },
    setCompanySuccess(state, action: PayloadAction<CompanyType>) {
      state.loadingg = false;
      state.company = action.payload;
    },
    setCompanyError(state, action: PayloadAction<string>) {
      state.loadingg = false;
      state.errorr = action.payload;
    },
  },
});

export const { setCompanyStart, setCompanySuccess, setCompanyError } = companySlice.actions;
export default companySlice.reducer;

export const fetchCompany = () => async (dispatch: AppDispatch) => {
  dispatch(setCompanyStart());
  try {
    const res = await authApi.get(`/company/get/`);
    dispatch(setCompanySuccess(res.data));
    console.log(res.data.data);
    
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const errorMessage =
      error.response?.data?.message || // API'dan kelgan xabar
      error.message ||                 // Axiosdan kelgan umumiy xabar
      'Maʼlumotlarni olishda nomaʼlum xatolik';

    dispatch(setCompanyError(errorMessage));
  }
};

export const selectCompany = (state: RootState) => state.company; // TO'G'RI nom
