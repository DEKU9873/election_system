import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData, useInsertDataWithImage } from "../hooks/useInsertData";
import { useGetDataToken } from "../hooks/useGetData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";
//  Add Tape
export const addTape = createAsyncThunk(
  "tape/add",
  async (tapeData, thunkAPI) => {
    try {
      const res = await useInsertDataWithImage("/api/tapes/", tapeData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//  Get All Tapes
export const getAllTapes = createAsyncThunk(
  "tape/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await useGetDataToken("/api/tapes/");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//  Get One Tape
export const getOneTape = createAsyncThunk(
  "tape/getOne",
  async (id, thunkAPI) => {
    try {
      const res = await useGetDataToken(`/api/tapes/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//  Delete Tape
export const deleteTape = createAsyncThunk(
  "tape/delete",
  async (id, thunkAPI) => {
    try {
      await useDeleteDataWithToken(`/api/tapes/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const tapeSlice = createSlice({
  name: "tape",
  initialState: {
    tapes: [],
    currentTape: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Add
      .addCase(addTape.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTape.fulfilled, (state, action) => {
        state.loading = false;
        state.tapes.push(action.payload);
      })
      .addCase(addTape.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllTapes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTapes.fulfilled, (state, action) => {
        state.loading = false;
        state.tapes = action.payload;
      })
      .addCase(getAllTapes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get One
      .addCase(getOneTape.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneTape.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTape = action.payload;
      })
      .addCase(getOneTape.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteTape.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTape.fulfilled, (state, action) => {
        state.loading = false;
        state.tapes = state.tapes.filter((tape) => tape.id !== action.payload);
      })
      .addCase(deleteTape.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const tapeReducer = tapeSlice.reducer;
