import { createContext, ReactNode, useState } from "react";
import { CartContextObject } from "../entities/CartContextObject";
import { CartItem } from "../entities/CartItem";

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
