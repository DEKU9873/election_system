// src/features/logs/logSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetDataToken } from '../hooks/useGetData';

// ✅ Async thunk for fetching logs
export const getLogs = createAsyncThunk(
  'log/getLogs',
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken('/api/log/');
      return response.data.data; // assuming API returns JSON array
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch logs'
      );
    }
  }
);

const logSlice = createSlice({
  name: 'log',
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const logReducer = logSlice.reducer;
