import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  categoryCheck,
  descriptionCheck,
  imageUrlCheck,
  nameCheck,
  priceCheck,
  supplierCheck,
  weightCheck,
} from "./utils/schemas";

export const ProductSchema = z.object({
  name: nameCheck,
  category: categoryCheck,
  supplier: supplierCheck,
  weight: weightCheck,
  imageUrl: imageUrlCheck,
  price: priceCheck,
  description: descriptionCheck,
});

export type ProductFormData = z.infer<typeof ProductSchema>;

export const ProductFormResolver = zodResolver(ProductSchema);
