import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "../../store/store-config";
import { authApi } from "../../hooks/auth"; 
import type { ShiftPayload } from "../../type";
import { AxiosError } from "axios";
interface ShiftState {
  shifts: ShiftPayload[];
  loading: boolean;
  error: string | null;
}

const initialState: ShiftState = {
  shifts: [],
  loading: false,
  error: null,
};

const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    setShifts(state, action: PayloadAction<ShiftPayload[]>) {
      state.shifts = action.payload;
    },
    removeShift(state, action: PayloadAction<number>) {
      state.shifts = state.shifts.filter((shift) => shift.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setShifts, removeShift, setLoading, setError } = shiftsSlice.actions;

export default shiftsSlice.reducer;

export const deleteShift = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await authApi.delete(`/company/shift-detail/${id}/`);
    dispatch(removeShift(id));
  } catch (err) {
    const error = err as AxiosError;
    console.error("Shift delete error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
