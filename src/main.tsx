import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import CartProvider from "./providers/cart-provider.tsx";
import ProductProvider from "./providers/products-provider.tsx";
import router from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <CartProvider>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
        
      </CartProvider>
  </React.StrictMode>
);
