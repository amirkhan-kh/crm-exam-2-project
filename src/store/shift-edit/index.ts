import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authApi } from "../../hooks/auth";
import type { ShiftPayload } from "../../type";
import type { AppDispatch } from "../../store/store-config";

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
    setShifts(state, action) {
      state.shifts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setShifts, setLoading, setError } = shiftsSlice.actions;

export const editShift = (id: number, updatedData: ShiftPayload) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await authApi.patch(`/company/shift-detail/${id}/`, updatedData);
    dispatch(setShifts(response.data));
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error("Smena yangilashda xatolik yuz berdi:", err);
    dispatch(setError("Smena yangilashda xatolik yuz berdi"));
  } finally {
    dispatch(setLoading(false));
  }
};

export default shiftsSlice.reducer;
