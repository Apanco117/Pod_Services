import api from "@/lib/axios"
import type { MonitorFilters } from "@/types";
import { LogConexionResponseSchema } from "@/types/schemas";
import { isAxiosError } from "axios";


export const getMonitorEvents = async(filtros: MonitorFilters) => {
    try{
        const { data } = await api.get('/monitor/events',{ params: filtros });
        const result = LogConexionResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion de eventos de monitor exitosa")
        return result.data;
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de eventos del monitor: ${error}`)
        throw new Error("Hubo un error inesperado al obtener los eventos del monitor");
    }
}