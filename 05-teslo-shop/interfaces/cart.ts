import { IValidSizes, IValidTypes } from "./products";

export interface ICartProduct {
  _id: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: IValidSizes;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}
