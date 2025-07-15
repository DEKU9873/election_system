import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData, useInsertDataWithToken } from "../hooks/useInsertData";
import { useGetData, useGetDataToken } from "../hooks/useGetData";
import { useDeleteDataWithToken } from "../hooks/useDeleteData";
import { useUpdateDataWithToken } from "../hooks/useUpdateData";

// إجراءات المحافظات
export const addGovernate = createAsyncThunk(
  "place/addGovernate",
  async (governateData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken(
        "/api/governate",
        governateData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getGovernates = createAsyncThunk(
  "place/getGovernates",
  async (_, thunkAPI) => {
    try {
      const response = await useGetData("/api/governate");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneGovernate = createAsyncThunk(
  "place/getOneGovernate",
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
  "place/deleteGovernate",
  async (id, thunkAPI) => {
    try {
      const response = await useDeleteDataWithToken(`/api/governate/${id}`);
      // إرجاع المعرف مع البيانات لاستخدامه في reducer
      return { id, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// تعديل محافظة
export const updateGovernate = createAsyncThunk(
  "place/updateGovernate",
  async (governateData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/governate/${governateData.id}`,
        governateData,
        "PUT"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات المناطق الفرعية
export const addSubdistrict = createAsyncThunk(
  "place/addSubdistrict",
  async (subdistrictData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken(
        "/api/subdistrict",
        subdistrictData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSubdistricts = createAsyncThunk(
  "place/getSubdistricts",
  async (governateId, thunkAPI) => {
    try {
      const response = await useGetData(
        `/api/subdistrict?governateId=${governateId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneSubdistrict = createAsyncThunk(
  "place/getOneSubdistrict",
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
  "place/deleteSubdistrict",
  async (id, thunkAPI) => {
    try {
      const response = await useDeleteDataWithToken(`/api/subdistrict/${id}`);
      // إرجاع المعرف مع البيانات لاستخدامه في reducer
      return { id, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// تعديل منطقة فرعية
export const updateSubdistrict = createAsyncThunk(
  "place/updateSubdistrict",
  async (subdistrictData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/subdistrict/${subdistrictData.id}`,
        subdistrictData,
        "PUT"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات المناطق
export const addDistrict = createAsyncThunk(
  "place/addDistrict",
  async (districtData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken(
        "/api/district",
        districtData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDistricts = createAsyncThunk(
  "place/getDistricts",
  async (subdistrictId, thunkAPI) => {
    try {
      const response = await useGetData(
        `/api/district?subdistrictId=${subdistrictId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneDistrict = createAsyncThunk(
  "place/getOneDistrict",
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
  "place/deleteDistrict",
  async (id, thunkAPI) => {
    try {
      const response = await useDeleteDataWithToken(`/api/district/${id}`);
      // إرجاع المعرف مع البيانات لاستخدامه في reducer
      return { id, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// تعديل منطقة
export const updateDistrict = createAsyncThunk(
  "place/updateDistrict",
  async (districtData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/district/${districtData.id}`,
        districtData,
        "PUT"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إجراءات مراكز الانتخابات
export const addElectionCenter = createAsyncThunk(
  "place/addElectionCenter",
  async (electionCenterData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken(
        "/api/electioncenter",
        electionCenterData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getElectionCenters = createAsyncThunk(
  "place/getElectionCenters",
  async (districtId, thunkAPI) => {
    try {
      const response = await useGetData(`/api/electioncenter/`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOneElectionCenter = createAsyncThunk(
  "place/getOneElectionCenter",
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
  "place/deleteElectionCenter",
  async (id, thunkAPI) => {
    try {
      const response = await useDeleteDataWithToken(
        `/api/electioncenter/${id}`
      );
      // إرجاع المعرف مع البيانات لاستخدامه في reducer
      return { id, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// تعديل مركز انتخابات
export const updateElectionCenter = createAsyncThunk(
  "place/updateElectionCenter",
  async (electionCenterData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/electioncenter/${electionCenterData.id}`,
        electionCenterData,
        "PUT"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إضافة محطة
export const addStation = createAsyncThunk(
  "place/addStation",
  async (stationData, thunkAPI) => {
    try {
      const response = await useInsertDataWithToken(
        "/api/station/",
        stationData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getStations = createAsyncThunk(
  "place/getStations",
  async (_, thunkAPI) => {
    try {
      const response = await useGetDataToken("/api/station/");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// جلب محطات باستخدام ID المركز
export const getStationsByCenterId = createAsyncThunk(
  "place/getStationsByCenterId",
  async (centerId, thunkAPI) => {
    try {
      const response = await useGetDataToken(`/api/station/center/${centerId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// حذف محطة
export const deleteStation = createAsyncThunk(
  "place/deleteStation",
  async (id, thunkAPI) => {
    try {
      const response = await useDeleteDataWithToken(`/api/station/${id}`);
      // إرجاع المعرف مع البيانات لاستخدامه في reducer
      return { id, ...response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// تعديل محطة
export const updateStation = createAsyncThunk(
  "place/updateStation",
  async (stationData, thunkAPI) => {
    try {
      const response = await useUpdateDataWithToken(
        `/api/station/${stationData.id}`,
        stationData,
        "PUT"
      );
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
  stations: [],
  selectedStation: null,
  loading: false,
  error: null,
  success: false,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.success = false;
    },
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
        state.governates = state.governates.filter(
          (gov) => gov.id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteGovernate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل محافظة
      .addCase(updateGovernate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGovernate.fulfilled, (state, action) => {
        state.loading = false;
        state.governates = state.governates.map((gov) =>
          gov.id === action.payload.id ? action.payload : gov
        );
        state.success = true;
      })
      .addCase(updateGovernate.rejected, (state, action) => {
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
        state.subdistricts = state.subdistricts.filter(
          (sub) => sub.id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteSubdistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل منطقة فرعية
      .addCase(updateSubdistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubdistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.subdistricts = state.subdistricts.map((sub) =>
          sub.id === action.payload.id ? action.payload : sub
        );
        state.success = true;
      })
      .addCase(updateSubdistrict.rejected, (state, action) => {
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
        state.districts = state.districts.filter(
          (dist) => dist.id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل منطقة
      .addCase(updateDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = state.districts.map((dist) =>
          dist.id === action.payload.id ? action.payload : dist
        );
        state.success = true;
      })
      .addCase(updateDistrict.rejected, (state, action) => {
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
        state.electionCenters = state.electionCenters.filter(
          (center) => center.id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteElectionCenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل مركز انتخابات
      .addCase(updateElectionCenter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateElectionCenter.fulfilled, (state, action) => {
        state.loading = false;
        state.electionCenters = state.electionCenters.map((center) =>
          center.id === action.payload.id ? action.payload : center
        );
        state.success = true;
      })
      .addCase(updateElectionCenter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // معالجات المحطات
      .addCase(addStation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStation.fulfilled, (state, action) => {
        state.loading = false;
        state.stations.push(action.payload);
        state.success = true;
      })
      .addCase(addStation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getStations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStations.fulfilled, (state, action) => {
        state.loading = false;
        state.stations = action.payload;
      })
      .addCase(getStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب المحطات باستخدام ID المركز
      .addCase(getStationsByCenterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStationsByCenterId.fulfilled, (state, action) => {
        state.loading = false;
        state.stations = action.payload;
      })
      .addCase(getStationsByCenterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حذف محطة
      .addCase(deleteStation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStation.fulfilled, (state, action) => {
        state.loading = false;
        state.stations = state.stations.filter(
          (station) => station.id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteStation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // تعديل محطة
      .addCase(updateStation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStation.fulfilled, (state, action) => {
        state.loading = false;
        state.stations = state.stations.map((station) =>
          station.id === action.payload.id ? action.payload : station
        );
        state.success = true;
      })
      .addCase(updateStation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const placeReducer = placeSlice.reducer;
