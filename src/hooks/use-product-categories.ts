import { PRODUCT_CATEGORY_ENDPOINT } from "../constants";
import ProductCategory from "../entities/ProductCategory";
import useData from "./use-data";

const useProductCategories = () => {
  return useData<ProductCategory>(PRODUCT_CATEGORY_ENDPOINT);
};

export default useProductCategories;
