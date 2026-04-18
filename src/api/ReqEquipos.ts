import api from "@/lib/axios"
import type { EquipoFormData, EquipoItem } from "@/types";
import { DeleteEquipoResponseSchema, EquipoResponseSchema, EquiposResponseSchema } from "@/types/schemas";
import { isAxiosError } from "axios";


export const getAllEquipos = async() => {
    try{
        const { data } = await api.get('/equipos');
        const result = EquiposResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion de equipos exitosa")
        return result.data;
    } catch(error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de equipos: ${error}`)
        throw new Error("Hubo un error inesperado al obtener los equipos");
    }
}

export const getEquipoById = async(id: EquipoItem["_id"]) => {
    try{
        const { data } = await api.get(`/equipos/${id}`);
        const result = EquipoResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion de equipo por id exitosa")
        return result.data;
    } catch (error){
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de equipo por id: ${error}`)
        throw new Error("Hubo un error inesperado al obtener el equipo");
    }
}


export const createEquipo = async(equipo : EquipoFormData) => {
    try{
        const { data } = await api.post('/equipos', equipo);
        const result = EquipoResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion de creación de equipo exitosa")
        return result.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de creación de equipo: ${error}`)
        throw new Error("Hubo un error inesperado al crear el equipo");
    }
}

type ActualizarEquipoParams = {
    equipo: EquipoFormData;
    id: EquipoItem["_id"];
}

export const actualizarEquipo = async({ equipo, id }: ActualizarEquipoParams) => {
    try{
        const { data } = await api.put(`/equipos/${id}`, equipo);
        const result = EquipoResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion de actualización de equipo exitosa")
        return result.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de actualización de equipo: ${error}`)
        throw new Error("Hubo un error inesperado al actualizar el equipo");
    }
}


export const deleteEquipoById = async(id: EquipoItem["_id"]) => {
    try{
        const { data } = await api.delete(`/equipos/${id}`);
        const result = DeleteEquipoResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion de eliminación de equipo exitosa")
        return result.data;
    } catch (error){
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de eliminación de equipo: ${error}`)
        throw new Error("Hubo un error inesperado al eliminar el equipo");
    }
}