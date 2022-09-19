export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: IValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: IValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
}

type IValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type IValidTypes = "shirts" | "pants" | "hoodies" | "hats";
