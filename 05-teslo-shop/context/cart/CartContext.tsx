import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

//* CONTEXT *//
import { ICartProduct } from "../../interfaces";

interface CartContextProps {
  cart: ICartProduct[];
  onAddProductToCart: (newProduct: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);

//* PROVIDER *//
interface CartProviderProps {
  children: React.ReactNode;
}

const CART_INITIAL_STATE: CartContextProps = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  onAddProductToCart: () => {},
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartProduct[]>(CART_INITIAL_STATE.cart);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart]);

  const onAddProductToCart = (newProduct: ICartProduct) => {
    let newCart = [...cart];

    const productWithSameId = newCart.findIndex(
      ({ _id, sizes }) => _id === newProduct._id
    );
    const productWithSameSize = newCart.findIndex(
      ({ _id, sizes }) => _id === newProduct._id && sizes === newProduct.sizes
    );
    const isThereProductWithSameSize = productWithSameSize >= 0;

    if (isThereProductWithSameSize) {
      newCart[productWithSameSize].quantity += newProduct.quantity;
      if (newCart[productWithSameSize].quantity > newProduct.inStock)
        newCart[productWithSameSize].quantity = newProduct.inStock;
      setCart([...newCart]);
    } else {
      setCart([...newCart, newProduct]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, onAddProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
