import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(50, { message: "Name must be at most 50 characters long." }),
  category: z.string().uuid({ message: "Category must be a valid UUID." }),
  supplier: z
    .string()
    .min(3, { message: "Supplier must be at least 3 characters long." })
    .max(20, { message: "Supplier must be at most 20 characters long." }),
  weight: z.coerce
    .number()
    .positive({ message: "Weight must be a positive number." }),
  imageUrl: z.coerce
    .string()
    .url({ message: "Image URL must be a valid URL." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(200, { message: "Description must be at most 200 characters long." }),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

export const ProductFormResolver = zodResolver(ProductSchema);
