import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import Product from "../entities/Product";
import { ProductsContextObject } from "../entities/ProductsContextObject";
import useProductCategories from "../hooks/use-product-categories";
import useProducts from "../hooks/use-products";

interface Props {
  children: ReactNode | ReactNode[];
}

const initialProductsState: ProductsContextObject = {
  contextProducts: [],
  productCategories:[],
  refetchProducts: () => {},
  error: "",
  isLoading: false,
};
export const ProductContext = createContext(initialProductsState);

const ProductProvider = ({ children }: Props) => {
  const { data:products, error, isLoading } = useProducts();
  const [localProducts, setLocalProducts] = useState(products);
  const { data: productCategories } = useProductCategories();
  const [localProductCategories, setLocalProductCategories] = useState(productCategories);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  useEffect(() => {
    setLocalProductCategories(productCategories);
  },[productCategories]);

  const refetchProducts = (data: SetStateAction<Product[]>) => {
    setLocalProducts(data);
  };

  return (
    <ProductContext.Provider
      value={{
        contextProducts: localProducts,
        productCategories: localProductCategories,
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
