import { Link } from "react-router-dom";
import { FALLBACK_IMAGE } from "../../constants";
import Product from "../../entities/product";

interface Props {
  product: Product;
}

const ProductListingItem = ({ product }: Props) => {
  return (
    <div className="product-listing-item">
      <img src={product.imageUrl || FALLBACK_IMAGE} />
      <div className="product-details">
        <span className="product-category">{product.category.name}</span>
        <h4 className="product-title">{product.name}</h4>
        <div className="atc-wrapper">
          <span className="price">$ {product.price}</span>
          <Link to={`/products/` + product.id} className="atc-btn">
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductListingItem;
