import Product from "../entities/Product";
import ProductCategory from "../entities/ProductCategory";
import { ProductFormData } from "../entities/ProductSchema";

export class ProductService {
  static generateProduct = (
    productCategories: ProductCategory[],
    data: ProductFormData,
  ): Product => {
    const category = productCategories.find(
      (category) => category.id === data.category,
    );
    const newProduct = { ...data, category } as Product;
    return newProduct;
  };
}
