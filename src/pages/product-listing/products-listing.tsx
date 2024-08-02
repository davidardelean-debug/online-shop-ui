import { Link } from "react-router-dom";
import ProductListingItem from "../../components/product-listing-item/product-listing-item";
import { CustomerRoles } from "../../entities/CustomerRoles";
import { useAuth } from "../../hooks/use-auth";
import { useGetProductsQuery } from "../../services/products-api-slice";

const ProductsListing = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  
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
        error && <div className="error">{JSON.stringify(error)}</div>
      )}
    </div>
  );
};

export default ProductsListing;
