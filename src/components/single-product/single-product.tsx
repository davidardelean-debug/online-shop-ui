import { config } from "../../constants";
import Product from "../../entities/Product";

interface Props{
  product: Product;
}
const SingleProduct = ({product}: Props) => {
  return (
    <div className="single-product">
      <div className="columns column-1">
        <img src={product.imageUrl || config.FALLBACK_IMAGE}/>
      </div>
      <div className="columns column-2">
        <div className="actions-wrapper">
          <h1 className="product-title">{product.name}</h1>
          <div>
            <a className="edit-btn" href="">Edit</a>
            <a className="delete-btn" href="">Delete</a>
          </div>
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-category">Category: {product.category.name}</p>
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-weight">Weight: {product.weight} kg</p>
      </div>
    </div>
  )
}

export default SingleProduct
