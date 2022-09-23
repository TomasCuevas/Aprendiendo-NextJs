import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

import { ICartProduct } from "../../interfaces";

//* CONTEXT *//
//* CONTEXT *//
interface CartContextProps {
  cart: ICartProduct[];
  cartCount: number;
  subtotal: number;
  taxes: number;
  total: number;
  onAddProductToCart: (newProduct: ICartProduct) => void;
  onDeleteCart: (product: ICartProduct) => void;
  onUpdateCartQuantity: (add: boolean, product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);

//* PROVIDER *//
//* PROVIDER *//
const CART_INITIAL_STATE = Cookie.get("cart")
  ? JSON.parse(Cookie.get("cart")!)
  : [];

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartProduct[]>(CART_INITIAL_STATE);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setCartCount(cart.reduce((prev, current) => current.quantity + prev, 0));
    setSubtotal(
      cart.reduce((prev, current) => current.price * current.quantity + prev, 0)
    );
    setTaxes(Number(((subtotal * 15) / 100).toFixed(2)));
    setTotal(Number((subtotal + taxes).toFixed(2)));
  }, [cart, subtotal, taxes]);

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

  const onDeleteCart = (product: ICartProduct) => {
    let newCart = [...cart];

    setCart(newCart.filter((cartProduct) => cartProduct !== product));
  };

  return (
    <CartContext.Provider
      value={{
        // properties
        cart,
        cartCount,
        subtotal,
        taxes,
        total,

        // methods
        onAddProductToCart,
        onDeleteCart,
        onUpdateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
