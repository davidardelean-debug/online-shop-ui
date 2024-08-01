import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductListingItem from "../../components/product-listing-item/product-listing-item";
import { CustomerRoles } from "../../entities/CustomerRoles";
import { useAuth } from "../../hooks/use-auth";
import { ProductContext } from "../../providers/products-provider";

const ProductsListing = () => {
  const {
    contextProducts: products,
    error,
    isLoading,
  } = useContext(ProductContext);
  const { user } = useAuth();
  return (
    <div>
      <div className="title-wrapper">
        <h1>Shop</h1>
        <button disabled={user?.role !== CustomerRoles.ADMIN}>
          <Link to="./new" className="btn">
            Add new product{" "}
          </Link>
        </button>
      </div>
      {isLoading && <div className="loader">Loading products...</div>}
      {products ? (
        <div className="products-listing-grid">
          {products.map((product) => (
            <ProductListingItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        error && <div className="error">{error}</div>
      )}
    </div>
  );
};

export default ProductsListing;
