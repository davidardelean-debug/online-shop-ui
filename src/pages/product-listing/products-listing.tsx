import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductListingItem from "../../components/product-listing-item/product-listing-item";
import { CustomerRoles } from "../../entities/CustomerRoles";
import { useGetProductsQuery } from "../../services/products-api";
import { RootState } from "../../store";

const ProductsListing = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate()
  return (
    <div>
      <div className="title-wrapper">
        <h1>Shop</h1>
        <Button
          variant="contained"
          disabled={user?.role !== CustomerRoles.ADMIN}
          onClick={() => navigate("./new")}
        >
          Add new product
        </Button>
      </div>
      {isLoading && <div className="loader">Loading products...</div>}
      {products ? (
        <div className="products-listing-grid">
          {products.map((product) => (
            <ProductListingItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        error && <div className="error">{JSON.stringify(error)}</div>
      )}
    </div>
  );
};

export default ProductsListing;
