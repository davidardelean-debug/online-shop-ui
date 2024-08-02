import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/products-api-slice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    // [ordersApi.reducerPath]: ordersApi.reducer,
    // [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      //   ordersApi.middleware,
      //   usersApi.middleware
    ),
});

import { setupListeners } from "@reduxjs/toolkit/query";
setupListeners(store.dispatch);
