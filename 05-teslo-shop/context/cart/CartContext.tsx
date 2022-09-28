import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import tesloApi from "../../api/tesloApi";

import { ICartProduct } from "../../interfaces/cart";
import { IOrder, ShippingAddress } from "../../interfaces/order";

//* CONTEXT *//
//* CONTEXT *//
interface CartContextProps {
  cart: Cart;
  shippingAddress: ShippingAddress;
  addProductToCart: (newProduct: ICartProduct) => void;
  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
  deleteCart: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  updateCartQuantity: (add: boolean, product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);

//* PROVIDER *//
//* PROVIDER *//
const CART_INITIAL_STATE: Cart = {
  cartItems: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [],
  numberOfItems: 0,
  isLoaded: false,
  subtotal: 0,
  taxes: 0,
  total: 0,
};

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

interface Cart {
  cartItems: ICartProduct[];
  numberOfItems: number;
  isLoaded: boolean;
  subtotal: number;
  taxes: number;
  total: number;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart>(CART_INITIAL_STATE);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    SHIPPING_ADDRESS_INITIAL_STATE
  );

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart.cartItems));
  }, [cart.cartItems]);

  useEffect(() => {
    setCart((prev) => ({
      ...prev,
      numberOfItems: cart.cartItems.reduce(
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

  const addProductToCart = (newProduct: ICartProduct) => {
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

  const updateCartQuantity = (add: boolean, product: ICartProduct) => {
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

  const deleteCart = (product: ICartProduct) => {
    let newCart = [...cart.cartItems];

    setCart((prev) => ({
      ...prev,
      cartItems: newCart.filter((cartProduct) => cartProduct !== product),
    }));
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set("address", address.address);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("firstName", address.firstName);
    Cookies.set("lastName", address.lastName);
    Cookies.set("phone", address.phone);
    Cookies.set("zip", address.zip);

    setShippingAddress(address);
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!shippingAddress) throw new Error("No hay direccion de entrega");

    const body: IOrder = {
      orderItems: cart.cartItems.map((product) => ({
        ...product,
        size: product.sizes!,
        image: product.images[0],
      })),
      shippingAddress,
      numberOfItems: cart.numberOfItems,
      subtotal: cart.subtotal,
      tax: cart.taxes,
      total: cart.total,
      isPaid: false,
    };

    try {
      const { data } = await tesloApi.post<IOrder>("/orders", body);

      setCart((prevCart) => ({
        ...prevCart,
        cartItems: [],
      }));

      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string };

        return {
          hasError: true,
          message,
        };
      }

      return {
        hasError: true,
        message: "Error no controlado, hable con un administrador.",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        // properties
        cart,
        shippingAddress,

        // methods
        addProductToCart,
        createOrder,
        deleteCart,
        updateAddress,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
