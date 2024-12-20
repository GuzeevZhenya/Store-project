import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { shuffle } from "../../utils/common";

const initialState = {
  list: [],
  isLoading: false,
  filtered: [],
  related: [],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/products`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const productsSlice = createSlice({
  initialState,
  name: "categories",
  reducers: {
    filterByPrice: (state, action) => {
      state.filtered = state.list.filter(({ price }) => price < action.payload);
    },
    getRelatedProducts: (state, action) => {
      const list = state.list.filter(
        ({ category: { id } }) => id === action.payload
      );

      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      // state.list.push(action.payload)
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { filterByPrice, getRelatedProducts } = productsSlice.actions;
export default productsSlice.reducer;
