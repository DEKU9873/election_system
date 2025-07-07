import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetDataToken } from "../hooks/useGetData";
import { useInsertDataWithToken } from "../hooks/useInsertData";
import { useUpdateDataWithToken } from "../hooks/useUpdateData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";

export const fetchExpenses = createAsyncThunk(
  "finance/fetchExpenses",
  async () => {
    const response = await useGetDataToken("/api/expense/");
    return response.data;
  }
);

export const fetchExpense = createAsyncThunk(
  "finance/fetchExpense",
  async (id) => {
    const response = await useGetDataToken(`/api/expense/${id}/`);
    return response.data;
  }
);

export const addExpense = createAsyncThunk(
  "finance/addExpense",
  async (expenseData) => {
    const response = await useInsertDataWithToken("/api/expense/", expenseData);
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "finance/updateExpense",
  async ({ id, expenseData }) => {
    const response = await useUpdateDataWithToken(
      `/api/expense/${id}/`,
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

export const fetchPayments = createAsyncThunk(
  "finance/fetchPayments",
  async () => {
    const response = await useGetDataToken("/api/payment/");
    return response.data;
  }
);

export const fetchPayment = createAsyncThunk(
  "finance/fetchPayment",
  async (id) => {
    const response = await useGetDataToken(`/api/payment/${id}/`);
    return response.data;
  }
);

export const addPayment = createAsyncThunk(
  "finance/addPayment",
  async (paymentData) => {
    const response = await useInsertDataWithToken("/api/payment/", paymentData);
    return response.data;
  }
);

export const updatePayment = createAsyncThunk(
  "finance/updatePayment",
  async ({ id, paymentData }) => {
    const response = await useUpdateDataWithToken(
      `/api/payment/${id}/`,
      paymentData
    );
    return response.data;
  }
);

export const deletePayment = createAsyncThunk(
  "finance/deletePayment",
  async (id) => {
    await useDeleteDataWithToken(`/api/payment/${id}/`);
    return id;
  }
);

const financeSlice = createSlice({
  name: "finance",
  initialState: {
    expenses: [],
    expense: null,
    payments: [],
    payment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
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
      })

      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.payment = action.payload;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        const index = state.payments.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter((p) => p.id !== action.payload);
      });
  },
});

export const financeReducer = financeSlice.reducer;
