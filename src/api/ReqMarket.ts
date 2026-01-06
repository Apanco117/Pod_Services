import api from "@/lib/axios"
import { MarketResponseSchema } from "@/types/schemas";
import { isAxiosError } from "axios";

export const getTranding = async () => {
    try {
        const { data } = await api.get('/market/trending');
        const result = MarketResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        //console.log("Peticion exitosa")
        return result.data;
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de market tranding: ${error}`)
        throw new Error("Hubo un error inesperado al obtener los usuarios");
    }
}

export const getTrandingMovers = async () => {
    try {
        console.log("/market/movers")
        const { data } = await api.get('/market/movers');
        const result = MarketResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion exitosa")
        return result.data;
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de market tranding: ${error}`)
        throw new Error("Hubo un error inesperado al obtener los usuarios");
    }
}