import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ordersApi } from "./services/orders-api";
import { productCategoriesApi } from "./services/product-categories-api";
import { productsApi } from "./services/products-api";
import { usersApi } from "./services/users-api";
import authReducer from "./slices/auth-slice";
import cartReducer from "./slices/cart-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productCategoriesApi.reducerPath]: productCategoriesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      productCategoriesApi.middleware,
      ordersApi.middleware,
      usersApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
