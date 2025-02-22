import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartRow from "../../components/cart-row/cart-row";
import EmptyCart from "../../components/empty-cart/empty-cart";
import CartService from "../../services/cart-service";
import { RootState } from "../../store";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
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
              />
            ))}
            <div className="cart-totals">
              Total:{" "}
              <span className="sum">
                ${CartService.calculateCartTotal(cart)}
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
