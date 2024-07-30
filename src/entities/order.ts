import { Customer } from "./customer";
import { Location } from "./location";
import { OrderItem } from "./order-item";

export interface Order {
  customer: Customer;

  country: string;

  city: string;

  county: string;

  street: string;

  orderItems: OrderItem[];

  location: Location;
}
