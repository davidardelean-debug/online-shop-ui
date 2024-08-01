import { LOCATION } from "../constants";
import { CartItem } from "../entities/CartItem";
import { Customer } from "../entities/Customer";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";

export class OrderService {
  static generateOrder = (
    form: HTMLFormElement,
    cart: CartItem[],
    customer: Customer,
  ) => {
    const formData = new FormData(form);
    const order: Order = {
      customer,
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
