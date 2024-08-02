import { createContext, ReactNode } from "react";
import { CartContextObject } from "../entities/CartContextObject";
import { CartItem } from "../entities/CartItem";
import { useLocalStorage } from "../hooks/use-local-storage";

interface Props {
  children: ReactNode | ReactNode[];
}

const initialCartState: CartContextObject = {
  cart: [],
  setCart: () => {},
};

export const CartContext = createContext(initialCartState);

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useLocalStorage('cart', [] as CartItem[]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
