import { useContext } from "react";
import { CartContextObject } from "../entities/CartContextObject";
import { CartContext } from "../providers/cart-provider";

export const useCart = () => {
  return useContext<CartContextObject>(CartContext);
};
