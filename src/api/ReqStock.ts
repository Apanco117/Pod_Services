import api from "@/lib/axios"
import { StockDetailSchema } from "@/types/schemas";
import { isAxiosError } from "axios";


export const getDetailTicker = async ( ticker : string ) => {
    try {

        const url = `/market/details/${ticker}`;
        console.log(url)
        const { data } = await api.get(url);
        const result = StockDetailSchema.safeParse(data);
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
        throw new Error("Hubo un error inesperado al obtener los detalles del ticker");
    }
}