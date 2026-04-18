import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle} from "@/components/ui/sheet"
import { useSearchParams } from 'react-router-dom';
import FormEquipo from "./FormEquipo";
import type { EquipoFormData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actualizarEquipo, getEquipoById } from "@/api/ReqEquipos";
import { toast } from 'sonner';
import { useState } from "react";
import GenericLoadingSkeleton from "../GenericLoadingSkeleton";
import ErrorData from "../ErrorData";

export default function EditarEquipoModal() {
    return (
        <div>
            <ModalSheet/>
        </div>
    )
}

function ModalSheet(){
    const [searchParams, setSearchParams] = useSearchParams();

    const equipoId = searchParams.get("editEquipo");

    const isModalOpen = !!equipoId;

    const [loading, setLoading] = useState(false);
    
    const handleCloseModal = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("editEquipo");
        setSearchParams(newParams);
    };

    const { data: equipoData, isLoading: isLoadingData, error: equipoError } = useQuery({
        queryKey: ['equipo', equipoId],
        queryFn: () => getEquipoById(equipoId!), 
        enabled: !!equipoId, 
        retry: false
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: actualizarEquipo,
        onSuccess: (data) => {
            toast.success(`Equipo ${data.data.ipv4} actualizado exitosamente`, {
                duration: 4000,
            });
            queryClient.invalidateQueries({ queryKey: ["equipos"] });
            queryClient.invalidateQueries({ queryKey: ["equipo", equipoId] });
            
            handleCloseModal();
            setLoading(false);
        },
        onError: (error) => {
             toast.error(error.message || 'Error al actualizar el equipo',{
                description: 'Por favor intenta nuevamente',
                duration: 4000,
            });
            setLoading(false);
        }
    })

    const onSubmit = async (data: EquipoFormData) => {
        setLoading(true);
        await mutation.mutateAsync({
            equipo: data,
            id: equipoId!,
        });
    }

    return(
        <Sheet open={isModalOpen} onOpenChange={handleCloseModal} >
            <SheetContent side="bottom" className=" flex justify-center w-full" >
                <div className=" w-full max-w-3xl px-5 mx-auto py-10">
                    <SheetHeader >
                        <SheetTitle className=" text-center text-xl">Actualizar equipo</SheetTitle>
                        <SheetDescription>Ingrese los detalles del equipo que desea actualizar.</SheetDescription>
                    </SheetHeader>
                     {isLoadingData ? <>
                        <GenericLoadingSkeleton/>
                    </> : equipoError ? <>
                        <ErrorData/>
                    </> : equipoData ? <>
                        <FormEquipo equipo={equipoData.data} onSubmit={onSubmit} textoBoton="Actualizar Equipo" isLoading={loading}/>    
                    </> : <>
                        <ErrorData/>
                    </>}
                    

                </div>
            </SheetContent>
        </Sheet>
    )
}