import { CartItem } from "../../entities/cart-item";

interface Props{
  cart: CartItem[]
}
const OrderDetails = ({cart}: Props) => {

const total = cart.reduce((acc, cartItem)=> acc+= cartItem.product.price * cartItem.quantity ,0)
  return (
    <div className="order-details">
      {
        cart.map(cartItem=><div key={cartItem.product.id} className="order-item">
          <img src={cartItem.product.imageUrl} width='100' height='100' />
          <span className="product-name">{cartItem.product.name}</span>
          <span className="product-quantity">{cartItem.quantity} pieces</span>
          <span className="product-subtotal">$ {(cartItem.quantity * cartItem.product.price).toFixed(2)}</span>
        </div>)
      }
      <span className="order-total">Total: ${total.toFixed(2)}</span>
    </div>
  )
}

export default OrderDetails