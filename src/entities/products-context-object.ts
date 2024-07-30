import { SetStateAction } from "react";
import Product from "./product";

export interface ProductsContextObject {
  contextProducts: Product[];
  refetchProducts: (data: SetStateAction<Product[]>) => void;
  error: string;
  isLoading: boolean;
}
