import Product from "../entities/Product";
import ProductCategory from "../entities/ProductCategory";
import { ProductFormData } from "../entities/ProductSchema";

export class ProductService {
  static generateProduct = (
    productCategories: ProductCategory[],
    data: ProductFormData,
    id?: string
  ): Product | undefined => {
    const category = productCategories.find(
      (category) => category.id === data.category
    );
    if (!category) {
      alert("Category not found");
      return;
    }
    const newProduct = { ...data, category, id } as Product;
    return newProduct;
  };
}
