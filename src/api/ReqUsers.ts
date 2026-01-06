import api from "@/lib/axios"
import { UsersSchema } from "@/types/schemas";
import { isAxiosError } from "axios";

export const getUsers = async() => {
    try {
        const { data } = await api.get('/useradmin');
        const result = UsersSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Los datos del servidor no tienen el formato correcto");
        }
        console.log("Peticion exitosa")
        return result.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        console.log(`Error al hacer la peticion de usuarios: ${error}`)
        throw new Error("Hubo un error inesperado al obtener los usuarios");
    }
}