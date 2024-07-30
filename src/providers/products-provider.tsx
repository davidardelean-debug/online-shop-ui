import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import Product from "../entities/Product";
import { ProductsContextObject } from "../entities/ProductsContextObject";
import useProducts from "../hooks/use-products";

interface Props {
  children: ReactNode | ReactNode[];
}

const initialProductsState: ProductsContextObject = {
  contextProducts: [],
  refetchProducts: () => {},
  error: "",
  isLoading: false,
};
export const ProductContext = createContext(initialProductsState);

const ProductProvider = ({ children }: Props) => {
  const { data, error, isLoading } = useProducts();
  const [localProducts, setLocalProducts] = useState(data);

  useEffect(() => {
    setLocalProducts(data);
  }, [data]);

  const refetchProducts = (data: SetStateAction<Product[]>) => {
    setLocalProducts(data);
  };

  return (
    <ProductContext.Provider
      value={{
        contextProducts: localProducts,
        refetchProducts,
        error,
        isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
