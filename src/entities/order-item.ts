import { Location } from "./location";
import Product from "./product";

export interface OrderItem {
  product: Product;

  quantity: number;

  location: Location;
}
