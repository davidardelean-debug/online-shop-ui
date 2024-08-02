import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../../components/order-details/order-details";
import { ORDERS_ENDPOINT } from "../../constants";
import { Order } from "../../entities/Order";
import { useAuth } from "../../hooks/use-auth";
import { useCart } from "../../hooks/use-cart";
import APIClient from "../../services/api-client";
import CartService from "../../services/cart-service";
import { OrderService } from "../../services/order-service";

const Checkout = () => {
  const { cart, setCart } = useCart();
  const [data, setData] = useState<Order>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (!user) {
      navigate("/login");
      return;
    }
    const order = OrderService.generateOrder(form, cart, user);

    const apiClient = new APIClient(ORDERS_ENDPOINT, accessToken);
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .add<Order>(order, { signal: controller.signal })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
        setCart(CartService.clearCart());
        setTimeout(() => navigate("/products"), 3000);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });
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
            <div className="error-message">An error occured: {error}</div>
          )}
          {isLoading && <div className="loader">Placing order...</div>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
