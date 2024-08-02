import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(50, { message: "Username must be at most 50 characters long." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type UserFormData = z.infer<typeof UserSchema>;

export const UserFormResolver = zodResolver(UserSchema);
