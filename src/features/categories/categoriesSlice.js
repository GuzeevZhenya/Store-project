import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const initialState = {
  list: [],
  isLoading: false,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/categories`);
      return res.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Network Error";
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: errorMessage,
      });
    }
  }
);

const categoriesSlice = createSlice({
  initialState,
  name: "categories",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      // state.list.push(action.payload)
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Сохраняем ошибку
    });
  },
});

export default categoriesSlice.reducer;
