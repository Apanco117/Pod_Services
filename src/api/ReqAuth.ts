import api from "@/lib/axios"
import { AuthResponseSchema, type ConfirmAccountForm, type LoginForm, type RegisterForm, type ResendTokenForm } from "@/types/AuthTypes";
import { MessageResponseSchema, UserSchema } from "@/types/schemas";
import { isAxiosError } from "axios";



export const getCurrentUser = async () => {
    const { data } = await api.get('/auth/user');
    const result = UserSchema.safeParse(data);
    if (!result.success) {
        console.error("Error de validación Zod:", result.error);
        throw new Error("Los datos del servidor no tienen el formato correcto");
    }
    return result.data;
}

export const login = async ( user : LoginForm ) => {
    try {
        const { data } = await api.post('/auth/login', user);
        
        const result = AuthResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        return result.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const customError = new Error(error.response.data.message || "Error");
            (customError as any).status = error.response.status; 
            throw customError;
        }
        throw new Error("Hubo un error inesperado al iniciar sesión");
    }
}

export const register = async (user : RegisterForm) => {
    try {
        const { data } = await api.post('/auth/register', user);

        const result = MessageResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        return result.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Hubo un error inesperado al registrar");
    }
}

export const confirmAccount = async ( dataForm : ConfirmAccountForm ) =>{
    try {
        const { data } = await api.post('/auth/verify', dataForm);

        const result = MessageResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        return result.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Hubo un error inesperado al confirmar la cuenta");
    }
}

export const resendToken = async ( dataForm : ResendTokenForm ) => {
    try {
        const { data } = await api.post('/auth/resend', dataForm);

        const result = MessageResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        return result.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Hubo un error inesperado al reenviar el token");
    }
}
