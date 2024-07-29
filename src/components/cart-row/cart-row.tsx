import { useState } from "react";
import { CartItem } from "../../entities/cart-item";
import CartService from "../../services/cart-service";

interface Props {
  cartItem: CartItem;
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
}

const CartRow = ({ cartItem, cart, setCart }: Props) => {
  const { product, quantity } = cartItem;
  const [newQuantity, setQuantity] = useState(quantity);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    setCart(CartService.updateCartItemQuantity(cartItem, cart, newQuantity));
  };
  return (
    <div className="cart-row">
      <img src={product.imageUrl} width="30" height="30" />
      <span className="product-name">{product.name}</span>
      <span className="product-category">{product.category.name}</span>
      <input
        type="number"
        id="product-quantity"
        min="1"
        value={newQuantity}
        onChange={handleQuantityChange}
      />
      <span className="product-price">$ {product.price}</span>
      <span className="product-subtotal">
        $ {(product.price * quantity).toFixed(2)}
      </span>
      <button
        className="btn remove-cart-item"
        onClick={() => setCart(CartService.removeFromCart(cartItem, cart))}
      >
        X
      </button>
    </div>
  );
};

export default CartRow;
