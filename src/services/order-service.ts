import { CUSTOMER, LOCATION } from "../constants";
import { CartItem } from "../entities/cart-item";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";

export class OrderService {
  static generateOrder = (form: HTMLFormElement, cart: CartItem[]) => {
    const formData = new FormData(form);
    const order: Order = {
      customer: CUSTOMER,
      country: formData.get("country") as string,
      city: formData.get("city") as string,
      county: formData.get("county") as string,
      street: formData.get("street") as string,
      orderItems: cart.map((cartItem) => {
        return {
          product: cartItem.product,
          quantity: cartItem.quantity,
          location: LOCATION,
        } as OrderItem;
      }),
      location: LOCATION,
    };
    return order;
  };
}
