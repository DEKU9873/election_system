import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useInsertData } from '../hooks/useInsertData';
import useGetData from '../hooks/useGetData';

// إجراءات المحافظات
export const addGovernate = createAsyncThunk(
  'place/addGovernate',
  async (governateData, thunkAPI) => {
    try {
      const response = await useInsertData('/api/governate', governateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getGovernates = createAsyncThunk(
  'place/getGovernates',
  async (_, thunkAPI) => {
    try {
      const response = await useGetData('/api/governate');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneGovernate = createAsyncThunk(
  'place/getOneGovernate',
  async (id, thunkAPI) => {
    try {
      const response = await useGetData(`/api/governate/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteGovernate = createAsyncThunk(
  'place/deleteGovernate',
  async (id, thunkAPI) => {
    try {
      const response = await useInsertData(`/api/governate/${id}`, {}, 'DELETE');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات المناطق الفرعية
export const addSubdistrict = createAsyncThunk(
  'place/addSubdistrict',
  async (subdistrictData, thunkAPI) => {
    try {
      const response = await useInsertData('/api/subdistrict', subdistrictData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSubdistricts = createAsyncThunk(
  'place/getSubdistricts',
  async (governateId, thunkAPI) => {
    try {
      const response = await useGetData(`/api/subdistrict?governateId=${governateId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneSubdistrict = createAsyncThunk(
  'place/getOneSubdistrict',
  async (id, thunkAPI) => {
    try {
      const response = await useGetData(`/api/subdistrict/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteSubdistrict = createAsyncThunk(
  'place/deleteSubdistrict',
  async (id, thunkAPI) => {
    try {
      const response = await useInsertData(`/api/subdistrict/${id}`, {}, 'DELETE');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات المناطق
export const addDistrict = createAsyncThunk(
  'place/addDistrict',
  async (districtData, thunkAPI) => {
    try {
      const response = await useInsertData('/api/district', districtData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDistricts = createAsyncThunk(
  'place/getDistricts',
  async (subdistrictId, thunkAPI) => {
    try {
      const response = await useGetData(`/api/district?subdistrictId=${subdistrictId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneDistrict = createAsyncThunk(
  'place/getOneDistrict',
  async (id, thunkAPI) => {
    try {
      const response = await useGetData(`/api/district/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteDistrict = createAsyncThunk(
  'place/deleteDistrict',
  async (id, thunkAPI) => {
    try {
      const response = await useInsertData(`/api/district/${id}`, {}, 'DELETE');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات مراكز الانتخابات
export const addElectionCenter = createAsyncThunk(
  'place/addElectionCenter',
  async (electionCenterData, thunkAPI) => {
    try {
      const response = await useInsertData('/api/electioncenter', electionCenterData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getElectionCenters = createAsyncThunk(
  'place/getElectionCenters',
  async (districtId, thunkAPI) => {
    try {
      const response = await useGetData(`/api/electioncenter?districtId=${districtId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneElectionCenter = createAsyncThunk(
  'place/getOneElectionCenter',
  async (id, thunkAPI) => {
    try {
      const response = await useGetData(`/api/electioncenter/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteElectionCenter = createAsyncThunk(
  'place/deleteElectionCenter',
  async (id, thunkAPI) => {
    try {
      const response = await useInsertData(`/api/electioncenter/${id}`, {}, 'DELETE');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  governates: [],
  selectedGovernate: null,
  subdistricts: [],
  selectedSubdistrict: null,
  districts: [],
  selectedDistrict: null,
  electionCenters: [],
  selectedElectionCenter: null,
  loading: false,
  error: null,
  success: false
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    // معالجات المحافظات
    builder
      .addCase(addGovernate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGovernate.fulfilled, (state, action) => {
        state.loading = false;
        state.governates.push(action.payload);
        state.success = true;
      })
      .addCase(addGovernate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب جميع المحافظات
      .addCase(getGovernates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGovernates.fulfilled, (state, action) => {
        state.loading = false;
        state.governates = action.payload;
      })
      .addCase(getGovernates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب محافظة واحدة
      .addCase(getOneGovernate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneGovernate.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGovernate = action.payload;
      })
      .addCase(getOneGovernate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف محافظة
      .addCase(deleteGovernate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGovernate.fulfilled, (state, action) => {
        state.loading = false;
        state.governates = state.governates.filter(gov => gov.id !== action.payload.id);
        state.success = true;
      })
      .addCase(deleteGovernate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // معالجات المناطق الفرعية
      .addCase(addSubdistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubdistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.subdistricts.push(action.payload);
        state.success = true;
      })
      .addCase(addSubdistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب المناطق الفرعية
      .addCase(getSubdistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubdistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.subdistricts = action.payload;
      })
      .addCase(getSubdistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب منطقة فرعية واحدة
      .addCase(getOneSubdistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneSubdistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSubdistrict = action.payload;
      })
      .addCase(getOneSubdistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف منطقة فرعية
      .addCase(deleteSubdistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubdistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.subdistricts = state.subdistricts.filter(sub => sub.id !== action.payload.id);
        state.success = true;
      })
      .addCase(deleteSubdistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // معالجات المناطق
      .addCase(addDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.districts.push(action.payload);
        state.success = true;
      })
      .addCase(addDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب المناطق
      .addCase(getDistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب منطقة واحدة
      .addCase(getOneDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDistrict = action.payload;
      })
      .addCase(getOneDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف منطقة
      .addCase(deleteDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = state.districts.filter(dist => dist.id !== action.payload.id);
        state.success = true;
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // معالجات مراكز الانتخابات
      .addCase(addElectionCenter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addElectionCenter.fulfilled, (state, action) => {
        state.loading = false;
        state.electionCenters.push(action.payload);
        state.success = true;
      })
      .addCase(addElectionCenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب مراكز الانتخابات
      .addCase(getElectionCenters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getElectionCenters.fulfilled, (state, action) => {
        state.loading = false;
        state.electionCenters = action.payload;
      })
      .addCase(getElectionCenters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب مركز انتخابات واحد
      .addCase(getOneElectionCenter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneElectionCenter.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedElectionCenter = action.payload;
      })
      .addCase(getOneElectionCenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف مركز انتخابات
      .addCase(deleteElectionCenter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteElectionCenter.fulfilled, (state, action) => {
        state.loading = false;
        state.electionCenters = state.electionCenters.filter(center => center.id !== action.payload.id);
        state.success = true;
      })
      .addCase(deleteElectionCenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const placeReducer = placeSlice.reducer;
