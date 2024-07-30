import { Location } from "./Location";
import Product from "./Product";

export interface OrderItem {
  product: Product;

  quantity: number;

  location: Location;
}
