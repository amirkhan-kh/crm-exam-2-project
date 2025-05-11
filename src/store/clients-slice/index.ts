import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IClient, IClientState } from "../../type";
import { authApi } from "../../hooks/auth";
import type { AxiosError } from "axios";

export const fetchClients = createAsyncThunk<IClient[], void, { rejectValue: string }>(
    'clients/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await authApi.get(`/company/clients/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.results;
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        return rejectWithValue(error.response?.data?.message || "Mijozlar ko‘rinmadi");
      }
    }
  )
  

const initialState: IClientState = {
  clients: [],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Xatolik yuz berdi";
      });
  },
});

export default clientsSlice.reducer;
