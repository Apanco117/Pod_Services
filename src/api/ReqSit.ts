import api from "@/lib/axios"
import { NodosResponseSchema } from "@/types/schemas";
import { isAxiosError } from "axios";


export const getNodosSit = async() => {
    try{
        const { data } = await api.post('/n8n/getNodo',{
            Task:"get_instance"
        });
        const result = NodosResponseSchema.safeParse(data);
        
        if (!result.success) {
            console.error("Error de validación en la respuesta:", result.error.format());
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Petición de nodos SIT exitosa");
        return result.data;
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de nodos del sit: ${error}`)
        throw new Error("Hubo un error inesperado al obtener los nodos del SIT");
    }
}