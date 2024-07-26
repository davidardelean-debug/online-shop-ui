import { Navigate, Route, Routes } from "react-router-dom";
import "./app.scss";
import PageLayout from "./components/page-layout/page-layout";
import ProductsListing from "./components/product-listing/products-listing";
import SingleProduct from "./components/single-product/single-product";
import { PRODUCTS } from "./static-content";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<PageLayout />}>
        <Route index element={<ProductsListing products={PRODUCTS} />}></Route>
        <Route path=":id" element={<SingleProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
