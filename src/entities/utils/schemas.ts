import { z } from "zod";

export const nameCheck = z
  .string()
  .min(3, { message: "Name must be at least 3 characters long." })
  .max(50, { message: "Name must be at most 50 characters long." });

export const categoryCheck = z
  .string()
  .uuid({ message: "Category cannot be found." });

export const supplierCheck = z
  .string()
  .min(3, { message: "Supplier must be at least 3 characters long." })
  .max(20, { message: "Supplier must be at most 20 characters long." });

export const weightCheck = z.coerce
  .number()
  .positive({ message: "Weight must be a positive number." });

export const imageUrlCheck = z.coerce
  .string()
  .url({ message: "Image URL must be a valid URL." });

export const priceCheck = z.coerce
  .number()
  .positive({ message: "Price must be a positive number." });

export const descriptionCheck = z
  .string()
  .min(10, { message: "Description must be at least 10 characters long." })
  .max(200, { message: "Description must be at most 200 characters long." });
