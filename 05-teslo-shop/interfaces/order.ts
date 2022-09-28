import { IUser } from "./user";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: string;
  quantity: number;
  slug: string;
  image: string;
  price: number;
}

export interface ShippingAddress {
  address: string;
  address2?: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  zip: string;
}
