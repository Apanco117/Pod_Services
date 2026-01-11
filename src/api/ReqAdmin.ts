import api from "@/lib/axios"
import { AdminStockResponseSchema } from "@/types/schemas";
import { isAxiosError } from "axios";

export const getStocks = async () => {
    try {
        const { data } = await api.get('/admin/stocks-status');
        const result = AdminStockResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        return result.data;
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de stocks tranding: ${error}`)
        throw new Error("Hubo un error inesperado al obtener los stocks");
    }
}