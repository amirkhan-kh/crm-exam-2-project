import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DepartmentProjectResponse } from "../../type/departments"; 
import type { AppDispatch } from "../store-config";
import { authApi } from "../../hooks/auth";
import type { AxiosError } from "axios";

interface DepartmentState {
  department: DepartmentProjectResponse[]; 
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  department: [],
  loading: false,
  error: null,
};

export const fetchDepartments = (branchId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const response = await authApi.get(`/company/departments/${branchId}`);

    console.log(response);
    
    dispatch(setDepartment(response.data)); 
  } catch (err) {
    const error = err as AxiosError;
    dispatch(setError("Xatolik: " + error.message));
  }
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setDepartment: (state, action: PayloadAction<DepartmentProjectResponse[]>) => {
      state.department = action.payload;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setDepartment, setError } = departmentSlice.actions;
export default departmentSlice.reducer;
