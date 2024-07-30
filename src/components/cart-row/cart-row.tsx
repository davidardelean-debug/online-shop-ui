import { useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../entities/CartItem";
import CartService from "../../services/cart-service";

interface CartRowProps {
  cartItem: CartItem;
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
}

const CartRow = ({ cartItem, cart, setCart }: CartRowProps) => {
  const { product, quantity } = cartItem;
  const [newQuantity, setQuantity] = useState(quantity);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setCart(CartService.updateCartItemQuantity(cartItem, cart, newQuantity));
  };
  return (
    <div className="cart-row">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} width="30" height="30" />
      </Link>
      <span className="product-name">{product.name}</span>
      <span className="product-category">{product.category.name}</span>
      <input
        type="number"
        className="product-quantity"
        min="1"
        value={newQuantity}
        onChange={handleQuantityChange}
      />
      <span className="product-price">$ {product.price}</span>
      <span className="product-subtotal">
        $ {(product.price * quantity).toFixed(2)}
      </span>
      <button
        className="btn remove-cart-item-button"
        onClick={() => setCart(CartService.removeFromCart(cartItem, cart))}
      >
        X
      </button>
    </div>
  );
};

export default CartRow;
