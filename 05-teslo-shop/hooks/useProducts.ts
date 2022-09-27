import useSWR, { SWRConfiguration } from "swr";

//* interfaces *//
import { IProduct } from "../interfaces/products";

interface Returns {
  products: [] | IProduct[];
  isLoading: boolean;
  isError: any;
}

export const useProducts = (
  url: string,
  config: SWRConfiguration = {}
): Returns => {
  const { data, error } = useSWR<IProduct[]>(`/api/${url}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
