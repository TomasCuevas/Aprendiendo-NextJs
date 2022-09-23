import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

//* CONTEXT *//
import { ICartProduct } from "../../interfaces";

interface CartContextProps {
  cart: ICartProduct[];
  onAddProductToCart: (newProduct: ICartProduct) => void;
  onUpdateCartQuantity: (add: boolean, product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);

//* PROVIDER *//
interface CartProviderProps {
  children: React.ReactNode;
}

const CART_INITIAL_STATE: CartContextProps = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  onAddProductToCart: () => {},
  onUpdateCartQuantity: () => {},
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartProduct[]>(CART_INITIAL_STATE.cart);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart]);

  const onAddProductToCart = (newProduct: ICartProduct) => {
    let newCart = [...cart];

    const productIndex = newCart.findIndex(
      ({ _id, sizes }) => _id === newProduct._id && sizes === newProduct.sizes
    );
    const isThereProduct = productIndex >= 0;

    if (isThereProduct) {
      newCart[productIndex].quantity += newProduct.quantity;
      if (newCart[productIndex].quantity > newProduct.inStock)
        newCart[productIndex].quantity = newProduct.inStock;
      setCart([...newCart]);
    } else {
      setCart([...newCart, newProduct]);
    }
  };

  const onUpdateCartQuantity = (add: boolean, product: ICartProduct) => {
    let newCart = [...cart];

    const productIndex = newCart.findIndex(
      ({ _id, sizes }) => _id === product._id && sizes === product.sizes
    );

    const isThereProduct = productIndex >= 0;

    if (isThereProduct) {
      add
        ? (newCart[productIndex].quantity += 1)
        : (newCart[productIndex].quantity -= 1);
      if (newCart[productIndex].quantity > product.inStock)
        newCart[productIndex].quantity = product.inStock;
      if (newCart[productIndex].quantity < 1)
        newCart[productIndex].quantity = 1;
    }

    setCart([...newCart]);
  };

  return (
    <CartContext.Provider
      value={{
        // properties
        cart,

        // methods
        onAddProductToCart,
        onUpdateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
