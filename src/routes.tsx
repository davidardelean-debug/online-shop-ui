import { createBrowserRouter, Navigate } from "react-router-dom";
import AddProduct from "./pages/add-product/add-product";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import EditProduct from "./pages/edit-product/edit-product";
import PageLayout from "./pages/page-layout/page-layout";
import ProductsListing from "./pages/product-listing/products-listing";
import SingleProduct from "./pages/single-product/single-product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/products",
    element: <PageLayout />,
    children: [
      { index: true, element: <ProductsListing /> },
      { path: ":id", element: <SingleProduct /> },
      { path: ":id/edit", element: <EditProduct /> },
      { path: "new", element: <AddProduct /> },
    ],
  },
  {
    path: "/cart",
    element: <PageLayout />,
    children: [{ index: true, element: <Cart /> }],
  },
  {
    path: "/checkout",
    element: <PageLayout />,
    children: [{ index: true, element: <Checkout /> }],
  },
]);

export default router;
