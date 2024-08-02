import { Customer } from "./Customer";
import { Location } from "./Location";
import { OrderItem } from "./OrderItem";

export interface Order {
  customer: Customer;

  country: string;

  city: string;

  county: string;

  street: string;

  orderItems: OrderItem[];

  location: Location;
}
