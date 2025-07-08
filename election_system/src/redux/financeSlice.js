import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetDataToken } from "../hooks/useGetData";
import { useInsertDataWithToken } from "../hooks/useInsertData";
import { useUpdateDataWithToken } from "../hooks/useUpdateData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";

export const getExpenses = createAsyncThunk("finance/getExpenses", async () => {
  const response = await useGetDataToken("/api/expense/");
  return response.data.data;
});

export const getExpense = createAsyncThunk("finance/getExpense", async (id) => {
  const response = await useGetDataToken(`/api/expense/${id}/`);
  return response.data;
});

export const addExpense = createAsyncThunk(
  "finance/addExpense",
  async (expenseData) => {
    const response = await useInsertDataWithToken("/api/expense/", expenseData);
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "finance/updateExpense",
  async ({ expenseData }) => {
    const response = await useUpdateDataWithToken(
      `/api/expense/${expenseData.id}/`,
      expenseData
    );
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "finance/deleteExpense",
  async (id) => {
    await useDeleteDataWithToken(`/api/expense/${id}/`);
    return id;
  }
);

const financeSlice = createSlice({
  name: "finance",
  initialState: {
    expenses: [],
    expense: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.expense = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter((e) => e.id !== action.payload);
      });
  },
});

export const financeReducer = financeSlice.reducer;
