import ProductCategory from "./product-category";

export default interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: string;
  imageUrl: string;
  category: ProductCategory;
}
