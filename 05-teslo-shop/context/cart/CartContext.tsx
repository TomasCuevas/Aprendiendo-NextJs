import { createContext, useState } from "react";
import { ICartProduct } from "../../interfaces";

//* CONTEXT *//
interface CartContextProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as CartContextProps);

//* PROVIDER *//
interface CartProviderProps {
  children: React.ReactNode;
}

const CART_INITIAL_STATE: CartContextProps = {
  cart: [],
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartProduct[]>(CART_INITIAL_STATE.cart);

  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
};
