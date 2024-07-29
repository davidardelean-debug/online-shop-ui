import { createBrowserRouter, Navigate } from "react-router-dom";
import Cart from "./pages/cart/cart";
import PageLayout from "./pages/page-layout/page-layout";
import ProductsListing from "./pages/product-listing/products-listing";
import SingleProduct from "./pages/single-product/single-product";
import { PRODUCTS } from "./static-content";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/products",
    element: <PageLayout />,
    children: [
      { index: true, element: <ProductsListing products={PRODUCTS} /> },
      { path: ":id", element: <SingleProduct /> },
    ],
  },
  {
    path: "/cart",
    element:<PageLayout/>,
    children:[
      {index:true, element: <Cart/>}
    ]
  },
]);

export default router;
