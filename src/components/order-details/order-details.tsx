import { CartItem } from "../../entities/CartItem";
import CartService from "../../services/cart-service";

interface OrderDetailsProps{
  cart: CartItem[]
}
const OrderDetails = ({cart}: OrderDetailsProps) => {

  return (
    <div className="order-details">
      {
        cart.map(cartItem=><div key={cartItem.product.id} className="order-item">
          <img src={cartItem.product.imageUrl} width='100' height='100' />
          <span className="product-name">{cartItem.product.name}</span>
          <span className="product-quantity">{cartItem.quantity} piece(s)</span>
          <span className="product-subtotal">$ {(cartItem.quantity * cartItem.product.price).toFixed(2)}</span>
        </div>)
      }
      <span className="order-total">Total: ${CartService.calculateCartTotal(cart)}</span>
    </div>
  )
}

export default OrderDetails