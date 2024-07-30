import { PRODUCTS_ENDPOINT } from "../constants";
import Product from "../entities/Product";
import useData from "./use-data";

const useProducts = () => {
  return useData<Product>(PRODUCTS_ENDPOINT);
};

export default useProducts;
