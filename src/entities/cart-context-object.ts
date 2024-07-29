import { CartItem } from "./cart-item";

export interface CartContextObject {
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
}
