import { Link } from "react-router-dom";
import { config } from "../../constants";
import Product from "../../entities/Product";

interface Props {
  product: Product;
}

const ProductListingItem = ({ product }: Props) => {
  return (
    <div className="product-listing-item">
      <img src={product.imageUrl || config.FALLBACK_IMAGE} />
      <div className="product-details">
        <span className="product-category">{product.category.name}</span>
        <h4 className="product-title">{product.name}</h4>
        <div className="atc-wrapper">
          <span className="price">$ {product.price}</span>
          <Link to={`/products/` + product.id} className="atc-btn">
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductListingItem;
