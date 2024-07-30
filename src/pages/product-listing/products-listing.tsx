import { useContext } from "react";
import ProductListingItem from "../../components/product-listing-item/product-listing-item";
import { ProductContext } from "../../providers/products-provider";

const ProductsListing = () => {
  const { contextProducts:products, error, isLoading } = useContext(ProductContext);
  return (
    <div>
      <h1>Shop</h1>
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
