import { SetStateAction } from "react";
import Product from "./Product";

export interface ProductsContextObject {
  contextProducts: Product[];
  refetchProducts: (data: SetStateAction<Product[]>) => void;
  error: string;
  isLoading: boolean;
}
