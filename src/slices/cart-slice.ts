import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../entities/CartItem";

const initialState = [] as CartItem[];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => action.payload,
    clearCart: () => [],
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
