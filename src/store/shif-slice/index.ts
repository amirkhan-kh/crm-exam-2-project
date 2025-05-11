import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../hooks/auth";
import type { IShifError, IShift, ShiftsState } from "../../type";
import type { AxiosError } from "axios";
import type { AppDispatch } from "../store-config";

const initialState: ShiftsState = {
  shifts: [],
  loading: false,
  error: null,
};

export const fetchShifts = (shiftId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const response = await authApi.get(`/company/shifts/${shiftId}/`);
    dispatch(setShifts(response.data));
  } catch (err) {
    const error = err as AxiosError<IShifError>;
    dispatch(setError("Xatolik: " + error.message));
  }
};

const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setShifts: (state, action: PayloadAction<IShift[]>) => {
      state.shifts = action.payload;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setShifts, setError } = shiftsSlice.actions;
export default shiftsSlice.reducer;
