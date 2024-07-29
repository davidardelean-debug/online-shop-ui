import { createContext, ReactNode, useState } from "react";
import { CartContextObject } from "../entities/cart-context-object";
import { CartItem } from "../entities/cart-item";

interface Props {
  children: ReactNode | ReactNode[];
}

const initialCartState: CartContextObject = {
  cart: [],
  setCart: () => {},
};

export const CartContext = createContext(initialCartState);

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
