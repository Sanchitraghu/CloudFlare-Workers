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

export type SignUpType = z.infer<typeof signUpValidation>;

export type SignInType = z.infer<typeof signInValidation>;