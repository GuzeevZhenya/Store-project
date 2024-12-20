import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      const login = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      return login.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    favoutrite: [],
    formType: "signup",
    showForm: false,
  },
  name: "user",
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];

      // Создаем уникальный идентификатор для товара с учетом размера
      const uniqueId = `${payload.id}-${payload.selectedSize}`;

      const found = state.cart.find(({ uniqueId: id }) => id === uniqueId);

      if (found) {
        // Увеличиваем количество для найденного товара
        newCart = newCart.map((item) => {
          return item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        // Добавляем новый товар с количеством 1 и уникальным идентификатором
        newCart.push({ ...payload, quantity: 1, uniqueId });
      }

      state.cart = newCart;
    },
    addItemToFavourite: (state, { payload }) => {
      let newCart = [...state.favoutrite];

      // Создаем уникальный идентификатор для товара с учетом размера
      const uniqueId = `${payload.id}-${payload.selectedSize}-favourite`;

      const found = state.favoutrite.find(
        ({ uniqueId: id }) => id === uniqueId
      );

      if (found) {
        // Увеличиваем количество для найденного товара
        newCart = newCart.map((item) => {
          return item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        // Добавляем новый товар с количеством 1 и уникальным идентификатором
        newCart.push({ ...payload, quantity: 1, uniqueId });
      }

      state.favoutrite = newCart;
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    userFormChanger: (state, { payload }) => {
      state.formType = payload;
    },
  },
  extraReducers: (builder) => {
    //     builder.addCase(getCategories.pending, (state) => {
    //       state.isLoading = true;
    //     });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });

    //     builder.addCase(getCategories.rejected, (state) => {
    //       state.isLoading = false;
    //     });
  },
});
export const {
  addItemToCart,
  addItemToFavourite,
  toggleForm,
  userFormChanger,
} = userSlice.actions;
export default userSlice.reducer;
