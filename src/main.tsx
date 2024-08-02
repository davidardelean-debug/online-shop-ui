import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { AuthProvider } from "./providers/auth-provider.tsx";
import CartProvider from "./providers/cart-provider.tsx";
import ProductProvider from "./providers/products-provider.tsx";
import router from "./routes.tsx";
import { store } from "./store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <RouterProvider router={router} />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
