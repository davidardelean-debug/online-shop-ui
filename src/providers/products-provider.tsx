import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import Product from "../entities/Product";
import { ProductsContextObject } from "../entities/ProductsContextObject";
import useProductCategories from "../hooks/use-product-categories";
import useProducts from "../hooks/use-products";

interface ProductProviderProps {
  children: ReactNode | ReactNode[];
}

const initialProductsState: ProductsContextObject = {
  contextProducts: [],
  productCategories: [],
  refetchProducts: () => {},
  error: "",
  isLoading: false,
};
export const ProductContext = createContext(initialProductsState);

const ProductProvider = ({ children }: ProductProviderProps) => {
  const { data: products, error, isLoading } = useProducts();
  const [localProducts, setLocalProducts] = useState(products);
  const { data: productCategories } = useProductCategories();
  const [localProductCategories, setLocalProductCategories] =
    useState(productCategories);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  useEffect(() => {
    setLocalProductCategories(productCategories);
  }, [productCategories]);

  const refetchProducts = (data: SetStateAction<Product[]>) => {
    setLocalProducts(data);
  };

  const value = useMemo(
    () => ({
      contextProducts: localProducts,
      productCategories: localProductCategories,
      refetchProducts,
      error,
      isLoading,
    }),
    [localProducts, localProductCategories, error, isLoading]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
