import { CartItem } from "./CartItem";

export interface CartContextObject {
  cart: CartItem[];
  setCart: (newCart: CartItem[]) => void;
}
