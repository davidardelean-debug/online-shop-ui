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
          <a className="atc-btn" href="">Add to cart</a>
        </div>
      </div>
    </div>
  );
};

export default ProductListingItem;
