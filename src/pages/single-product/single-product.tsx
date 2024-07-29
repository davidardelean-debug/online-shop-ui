import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FALLBACK_IMAGE } from "../../constants";
import Product from "../../entities/product";
import { CartContext } from "../../providers/cart-provider";
import CartService from "../../services/cart-service";
import { PRODUCTS } from "../../static-content";

const SingleProduct = () => {
  const { id } = useParams();
  const product: Product = PRODUCTS.find((product) => product.id == id!)!;
  const [quantity, setQuantity] = useState(1);

  const { cart, setCart } = useContext(CartContext);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const navigate = useNavigate();
  return (
    <div className="single-product">
      <div className="columns column-1">
        <img decoding="auto" src={product.imageUrl || FALLBACK_IMAGE} />
      </div>
      <div className="columns column-2">
        <div className="sticky-section">
          <div className="top-side">
            <div className="actions-wrapper">
              <h1 className="product-title">{product.name}</h1>
              <div>
                <button className="edit-btn btn">Edit</button>
                <button className="delete-btn btn">Delete</button>
              </div>
            </div>
            <span className="product-description">{product.description}</span>
            <span className="product-category">
              Category: {product.category.name}
            </span>
            <span className="product-price">Price: ${product.price}</span>
            <span className="product-weight">Weight: {product.weight} kg</span>
          </div>
          <div className="bottom-side">
            <input
              type="number"
              id="product-quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              className="atc-btn btn"
              onClick={() =>{
                setCart(CartService.addToCart({ product, quantity}, cart))
                navigate('/cart')
              }
              }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
