import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartRow from "../../components/cart-row/cart-row";
import EmptyCart from "../../components/empty-cart/empty-cart";
import { CartContextObject } from "../../entities/cart-context-object";
import { CartContext } from "../../providers/cart-provider";

const Cart = () => {
  const { cart, setCart } = useContext<CartContextObject>(CartContext);
  const navigate = useNavigate();

  return (
    <>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cart">
          <h1>Cart</h1>
          <div className="cart-items">
            <div className="cart-headings">
              <span>Image</span>
              <span>Name</span>
              <span>Category</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Subtotal</span>
            </div>
            {cart.map((cartItem) => (
              <CartRow
                key={cartItem.product.id}
                cartItem={cartItem}
                cart={cart}
                setCart={setCart}
              />
            ))}
            <div className="cart-totals">
              Total:{" "}
              <span className="sum">
                $
                {cart
                  .reduce(
                    (acc, value) => acc + value.product.price * value.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>

          <button
            className="btn checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Chekout
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
