import { SetStateAction } from "react";
import Product from "./Product";
import ProductCategory from "./ProductCategory";

export interface ProductsContextObject {
  contextProducts: Product[];
  productCategories: ProductCategory[];
  refetchProducts: (data: SetStateAction<Product[]>) => void;
  error: string;
  isLoading: boolean;
}
