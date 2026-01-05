import { z } from "zod";


export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "El email es obligatorio" })
        .email({ message: "Formato de email no válido" }),
    password: z
        .string()
        .min(8, { message: "El password debe tener al menos 8 caracteres" })
        .regex(/[A-Z]/, { message: "El password debe tener al menos una mayúscula" })
        .regex(/[a-z]/, { message: "El password debe tener al menos una minúscula" })
        .regex(/[0-9]/, { message: "El password debe tener al menos un número" }),
});

export const RegisterSchema = z.object({
    nombre: z.string().min(1, { message: 'El nombre es obligatorio' }),
    email: z.string().email({ message: 'Email no válido' }),
    password: z.string()
        .min(8, { message: "El password debe tener al menos 8 caracteres" })
        .regex(/[A-Z]/, { message: "El password debe tener al menos una mayúscula" })
        .regex(/[a-z]/, { message: "El password debe tener al menos una minúscula" })
        .regex(/[0-9]/, { message: "El password debe tener al menos un número" }),
        
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no son iguales",
    path: ["password_confirmation"]
});

export const ConfirmAccountSchema = z.object({
    token: z.string().length(6, { message: "El token debe tener 6 dígitos" }).regex(/^\d+$/, { message: "El token solo debe contener dígitos" }),
});

export const ResendTokenSchema = z.object({
    email: z.string().email({ message: 'Email no válido' }),
});

export type RegisterForm = z.infer<typeof RegisterSchema>;

export const AuthResponseSchema = z.object({
    bearToken: z.string(),
    expiredAt: z.string()
});

export type ResendTokenForm = z.infer<typeof ResendTokenSchema>;
export type ConfirmAccountForm = z.infer<typeof ConfirmAccountSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type LoginForm = z.infer<typeof LoginSchema>;