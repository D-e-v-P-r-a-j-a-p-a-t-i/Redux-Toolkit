import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const calcTotalAmount = (items) => {
  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.qnty;
  });
  return totalAmount;
};

const calcTotalQnty = (cartItems) => {
  console.log(cartItems);
  let totalQnty = 0;
  cartItems.forEach((item) => {
    totalQnty += item.qnty;
  });
  return totalQnty;
};

const initialState = {
  cartItems: [],
  totalQnty: 0,
  totalAmount: 0,
  isLoading: true,
};

const url = "http://localhost:3000/items";

export const getCartItems = createAsyncThunk("cart/getCartItems", async(_, thunkAPI) => {
    console.log(thunkAPI)
  return await fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

console.log(getCartItems);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQnty = 0;
      state.totalAmount = calcTotalAmount(state.cartItems);

      // return {
      //     ...state, cartItems : [], totalQnty : 0, totalAmount : 0
      // }
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
      state.totalQnty = calcTotalQnty(state.cartItems);
      state.totalAmount = calcTotalAmount(state.cartItems);

      // return {
      //     ...state, cartItems : state.cartItems.filter( item => item.id !== payload), totalQnty : state.totalQnty - 1
      // }
    },
    increaseQnty: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload);
      item.qnty < 10
        ? (item.qnty += 1) && (state.totalQnty += 1)
        : (item.qnty = 10);
      state.totalAmount = calcTotalAmount(state.cartItems);
    },
    decreaseQnty: (state, { payload }) => {
      state.totalQnty -= 1;
      const item = state.cartItems.find((item) => item.id === payload);
      item.qnty > 1
        ? (item.qnty -= 1) && (state.totalQnty -= 1)
        : (item.qnty = 1);
      state.totalAmount = calcTotalAmount(state.cartItems);
    },
    calculateTotals: (state) => {
      calcTotalAmount(state.cartItems);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
        state.totalAmount = calcTotalAmount(state.cartItems)
        state.totalQnty = calcTotalQnty(state.cartItems)
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increaseQnty, decreaseQnty } =
  cartSlice.actions;
export default cartSlice.reducer;
