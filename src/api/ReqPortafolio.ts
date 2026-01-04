import api from "@/lib/axios"
import { PortfolioResponseSchema } from '@/types/schemas';
import type { PortfolioResponse } from '@/types';

export const getPortfolio = async (): Promise<PortfolioResponse> => {
    const { data } = await api.get('/portafolio');
    const result = PortfolioResponseSchema.safeParse(data);
    if (!result.success) {
        console.error("Error de validación Zod:", result.error);
        throw new Error("Los datos del servidor no tienen el formato correcto");
    }
    return result.data;
}