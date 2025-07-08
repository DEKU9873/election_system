import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetDataToken } from "../hooks/useGetData";
import { useInsertDataWithToken } from "../hooks/useInsertData";
import { useUpdateDataWithToken } from "../hooks/useUpdateData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";

// إجراءات الميزانية
export const getBudgets = createAsyncThunk(
  "finance/getBudgets", 
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken("/api/budget/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getBudget = createAsyncThunk(
  "finance/getBudget", 
  async (id, thunkAPI) => {
    try {
      const response = await useGetDataToken(`/api/budget/${id}/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addBudget = createAsyncThunk(
  "finance/addBudget",
  async (budgetData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken("/api/budget/", budgetData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateBudget = createAsyncThunk(
  "finance/updateBudget",
  async (budgetData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/budget/${budgetData.id}/`,
        budgetData,
        "PUT"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteBudget = createAsyncThunk(
  "finance/deleteBudget",
  async (id, thunkAPI) => {
    try {
      await useDeleteDataWithToken(`/api/budget/${id}/`);
      // إرجاع المعرف لاستخدامه في reducer
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات رأس المال
export const getFinanceCapitals = createAsyncThunk(
  "finance/getFinanceCapitals", 
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken("/api/finance-capital/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFinanceCapital = createAsyncThunk(
  "finance/getFinanceCapital", 
  async (id, thunkAPI) => {
    try {
      const response = await useGetDataToken(`/api/finance-capital/${id}/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addFinanceCapital = createAsyncThunk(
  "finance/addFinanceCapital",
  async (capitalData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken("/api/finance-capital/", capitalData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateFinanceCapital = createAsyncThunk(
  "finance/updateFinanceCapital",
  async (capitalData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/finance-capital/${capitalData.id}/`,
        capitalData,
        "PUT"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteFinanceCapital = createAsyncThunk(
  "finance/deleteFinanceCapital",
  async (id, thunkAPI) => {
    try {
      await useDeleteDataWithToken(`/api/finance-capital/${id}/`);
      // إرجاع المعرف لاستخدامه في reducer
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات المصروفات
export const getExpenses = createAsyncThunk(
  "finance/getExpenses", 
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken("/api/expense/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getExpense = createAsyncThunk(
  "finance/getExpense", 
  async (id, thunkAPI) => {
    try {
      const response = await useGetDataToken(`/api/expense/${id}/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addExpense = createAsyncThunk(
  "finance/addExpense",
  async (expenseData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken("/api/expense/", expenseData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "finance/updateExpense",
  async (expenseData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/expense/${expenseData.id}/`,
        expenseData,
        "PUT"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "finance/deleteExpense",
  async (id, thunkAPI) => {
    try {
      await useDeleteDataWithToken(`/api/expense/${id}/`);
      // إرجاع المعرف لاستخدامه في reducer
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  expenses: [],
  expense: null,
  financeCapitals: [],
  financeCapital: null,
  budgets: [],
  budget: null,
  loading: false,
  error: null,
  success: false,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // جلب جميع المصروفات
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب مصروف واحد
      .addCase(getExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // إضافة مصروف
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
        state.success = true;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل مصروف
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        );
        state.success = true;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف مصروف
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب جميع رؤوس الأموال
      .addCase(getFinanceCapitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFinanceCapitals.fulfilled, (state, action) => {
        state.loading = false;
        state.financeCapitals = action.payload;
      })
      .addCase(getFinanceCapitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب رأس مال واحد
      .addCase(getFinanceCapital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFinanceCapital.fulfilled, (state, action) => {
        state.loading = false;
        state.financeCapital = action.payload;
      })
      .addCase(getFinanceCapital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // إضافة رأس مال
      .addCase(addFinanceCapital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFinanceCapital.fulfilled, (state, action) => {
        state.loading = false;
        state.financeCapitals.push(action.payload);
        state.success = true;
      })
      .addCase(addFinanceCapital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل رأس مال
      .addCase(updateFinanceCapital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFinanceCapital.fulfilled, (state, action) => {
        state.loading = false;
        state.financeCapitals = state.financeCapitals.map((capital) =>
          capital.id === action.payload.id ? action.payload : capital
        );
        state.success = true;
      })
      .addCase(updateFinanceCapital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف رأس مال
      .addCase(deleteFinanceCapital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFinanceCapital.fulfilled, (state, action) => {
        state.loading = false;
        state.financeCapitals = state.financeCapitals.filter((capital) => capital.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteFinanceCapital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب جميع الميزانيات
      .addCase(getBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload;
      })
      .addCase(getBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب ميزانية واحدة
      .addCase(getBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budget = action.payload;
      })
      .addCase(getBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // إضافة ميزانية
      .addCase(addBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets.push(action.payload);
        state.success = true;
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل ميزانية
      .addCase(updateBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        );
        state.success = true;
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف ميزانية
      .addCase(deleteBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.filter((budget) => budget.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
