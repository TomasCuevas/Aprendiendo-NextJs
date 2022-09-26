import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { ICartProduct } from "../../interfaces";

//* CONTEXT *//
//* CONTEXT *//
interface CartContextProps {
  cart: Cart;
  shippingAddress?: ShippingAddress;
  onAddProductToCart: (newProduct: ICartProduct) => void;
  onDeleteCart: (product: ICartProduct) => void;
  onUpdateCartQuantity: (add: boolean, product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);

//* PROVIDER *//
//* PROVIDER *//
const CART_INITIAL_STATE = Cookies.get("cart")
  ? JSON.parse(Cookies.get("cart")!)
  : [];

const SHIPPING_ADDRESS_INITIAL_STATE: ShippingAddress = {
  address: Cookies.get("address") || "",
  address2: Cookies.get("address2") || "",
  city: Cookies.get("city") || "",
  country: Cookies.get("country") || "",
  firstName: Cookies.get("firstName") || "",
  lastName: Cookies.get("lastName") || "",
  phone: Cookies.get("phone") || "",
  zip: Cookies.get("zip") || "",
};

interface CartProviderProps {
  children: React.ReactNode;
}

interface ShippingAddress {
  address: string;
  address2: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  zip: string;
}

interface Cart {
  cartItems: ICartProduct[];
  cartCount: number;
  isLoaded: boolean;
  subtotal: number;
  taxes: number;
  total: number;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart>({
    cartItems: CART_INITIAL_STATE,
    cartCount: 0,
    isLoaded: false,
    subtotal: 0,
    taxes: 0,
    total: 0,
  });
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    SHIPPING_ADDRESS_INITIAL_STATE
  );

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart.cartItems));
  }, [cart.cartItems]);

  useEffect(() => {
    setCart((prev) => ({
      ...prev,
      cartCount: cart.cartItems.reduce(
        (prevState, current) => current.quantity + prevState,
        0
      ),
      isLoaded: true,
      subtotal: cart.cartItems.reduce(
        (prevState, current) => current.price * current.quantity + prevState,
        0
      ),
      taxes: Number(((cart.subtotal * 15) / 100).toFixed(2)),
      total: Number((cart.subtotal + cart.taxes).toFixed(2)),
    }));
  }, [cart.cartItems, cart.subtotal, cart.taxes]);

  const onAddProductToCart = (newProduct: ICartProduct) => {
    let newCart = [...cart.cartItems];

    const productIndex = newCart.findIndex(
      ({ _id, sizes }) => _id === newProduct._id && sizes === newProduct.sizes
    );
    const isThereProduct = productIndex >= 0;

    if (isThereProduct) {
      newCart[productIndex].quantity += newProduct.quantity;
      if (newCart[productIndex].quantity > newProduct.inStock)
        newCart[productIndex].quantity = newProduct.inStock;
      setCart((prev) => ({
        ...prev,
        cartItems: newCart,
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        cartItems: [...newCart, newProduct],
      }));
    }
  };

  const onUpdateCartQuantity = (add: boolean, product: ICartProduct) => {
    let newCart = [...cart.cartItems];

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

    setCart((prev) => ({
      ...prev,
      cartItems: newCart,
    }));
  };

  const onDeleteCart = (product: ICartProduct) => {
    let newCart = [...cart.cartItems];

    setCart((prev) => ({
      ...prev,
      cartItems: newCart.filter((cartProduct) => cartProduct !== product),
    }));
  };

  return (
    <CartContext.Provider
      value={{
        // properties
        cart,
        shippingAddress,

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
