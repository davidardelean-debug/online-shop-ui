import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../../components/order-details/order-details";
import { Order } from "../../entities/Order";
import { OrderService } from "../../services/order-service";
import { useAddOrderMutation } from "../../services/orders-api";
import { clearCart } from "../../slices/cart-slice";
import { RootState, store } from "../../store";

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [data, setData] = useState<Order>();
  const [addOrder, { error, isLoading }] = useAddOrderMutation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    let order = null;
    if (user) order = OrderService.generateOrder(form, cart, user);
    if (order) {
      addOrder(order)
        .unwrap()
        .then((payload) => {
          setData(payload);
          store.dispatch(clearCart());
          setTimeout(() => navigate("/products"), 3000);
        });
    }
  };

  return (
    <div className="checkout">
      <div className="columns column-1">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Country *"
            required
            autoComplete="on"
            minLength={5}
          />
          <input
            type="text"
            name="county"
            id="county"
            placeholder="County *"
            required
            autoComplete="on"
            minLength={5}
          />
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City *"
            required
            autoComplete="on"
            minLength={5}
          />
          <input
            type="text"
            name="street"
            id="street"
            placeholder="Street address *"
            required
            autoComplete="on"
            minLength={5}
          />
          <input
            type="submit"
            name="place-order"
            id="place-order"
            value="Place order"
            className="btn"
            disabled={data !== undefined}
          />
        </form>
      </div>

      <div className="columns column-2">
        <OrderDetails cart={cart} />
        <div className="order-notice">
          {data && (
            <div className="success-message">Order placed successffuly!</div>
          )}
          {error && (
            <div className="error-message">
              Invalid credentials or Insufficient stock.
            </div>
          )}
          {isLoading && <div className="loader">Placing order...</div>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
