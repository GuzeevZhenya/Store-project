import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      const user = JSON.stringify(res.data);
      localStorage.setItem("userKey", user);
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

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      const login = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      // localStorage.setItem("userKey", JSON.stringify(login.data));

      return login.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isInitialisiatUser = createAsyncThunk(
  "users/isInitialisiatUser",
  async (_, thunkAPI) => {
    // Предположим, что access_token сохраняется отдельно
    const token = localStorage.getItem("access_token"); // Извлекаем токен

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const res = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Сохраняем данные пользователя
      // localStorage.setItem("userKey", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "users/logOutUser",
  async (payload, thunkAPI) => {
    localStorage.removeItem("userKey");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return null;
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
    sizes: "",
  },
  name: "user",
  reducers: {
    addItemToCart: (state, { payload }) => {
      const uniqueId = `${payload.id}-${payload.selectedSize}`;
      const existingItem = state.cart.find(
        (item) => item.uniqueId === uniqueId
      );

      if (existingItem) {
        existingItem.quantity += 1; // Увеличиваем количество
      } else {
        state.cart.push({ ...payload, quantity: 1, uniqueId });
      }
    },
    removeItemFromCart: (state, { payload }) => {
      const uniqueId = `${payload.id}-${payload.selectedSize}`;
      const existingItem = state.cart.find(
        (item) => item.uniqueId === uniqueId
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cart = state.cart.filter((item) => item.uniqueId !== uniqueId); // Удаляем товар
        } else {
          existingItem.quantity -= 1; // Уменьшаем количество
        }
      }
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
    builder.addCase(isInitialisiatUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.currentUser = null;
      state.cart = [];
      state.favoutrite = [];
    });
  },
});
export const {
  addItemToCart,
  addItemToFavourite,
  toggleForm,
  userFormChanger,
  removeItemFromCart,
} = userSlice.actions;
export default userSlice.reducer;
