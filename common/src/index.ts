import z from "zod";

export const signUpValidation = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password:z.string().min(6),
});

export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const blogContentValidation = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

export type SignUpType = z.infer<typeof signUpValidation>;

export type SignInType = z.infer<typeof signInValidation>;

export type BlogContentType = z.infer<typeof blogContentValidation>;