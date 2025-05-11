import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../hooks/auth";
import type { AxiosError } from "axios";
import type { AppDispatch } from "../store-config";

interface ShiftPayload {
  name: string;
  start_time: string;
  end_time: string;
}

interface ShiftState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ShiftState = {
  loading: false,
  success: false,
  error: null,
};

export const createShift = (payload: ShiftPayload) => async (dispatch: AppDispatch) => {
  dispatch(createShiftStart());
  try {
    await authApi.post("/company/shift-create/", payload);
    
    dispatch(createShiftSuccess());
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const message =
      error.response?.data?.message || error.message || "Xatolik yuz berdi";
    dispatch(createShiftFailure(message));
  }
};



const shiftSlice = createSlice({
  name: "shiftPost",
  initialState,
  reducers: {
    createShiftStart(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    createShiftSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    createShiftFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetShiftStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  createShiftStart,
  createShiftSuccess,
  createShiftFailure,
  resetShiftStatus,
} = shiftSlice.actions;

export default shiftSlice.reducer;


