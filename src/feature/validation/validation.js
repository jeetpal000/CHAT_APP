import z from "zod";

export const userSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3),
    number: z
        .string()
        .max(10, "Please enter valid number only 10 digits")
        .min(10, "Please enter valid number minimum 10 digits"),
   about: z
        .string()
        .optional(),
    avatar: z
        .string()
        .optional(),
        
})