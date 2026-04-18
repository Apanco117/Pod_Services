import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle} from "@/components/ui/sheet"
import { useSearchParams } from 'react-router-dom';
import FormEquipo from "./FormEquipo";
import type { EquipoFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEquipo } from "@/api/ReqEquipos";
import { toast } from 'sonner';
import { useState } from "react";

export default function CrearEquipoModal() {
    return (
        <div>
            <ModalSheet/>
        </div>
    )
}

function ModalSheet(){
    const [searchParams, setSearchParams] = useSearchParams();
    const isModalOpen = searchParams.get("crearEquipo") === "true";

    const [loading, setLoading] = useState(false);
    
    const handleCloseModal = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("crearEquipo");
        setSearchParams(newParams);
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createEquipo,
        onSuccess: (data) => {
            toast.success(`Equipo creado ${data.data.ipv4} exitosamente`, {
                duration: 4000,
            });
            queryClient.invalidateQueries({ queryKey: ["equipos"],  });
            handleCloseModal();
            setLoading(false);
        },
        onError: (error) => {
             toast.error(error.message || 'Error al crear el equipo',{
                description: 'Por favor intenta nuevamente',
                duration: 4000,
            });
            setLoading(false);
        }
    })

    const onSubmit = async (data: EquipoFormData) => {
        setLoading(true);
        await mutation.mutateAsync(data);
    }

    return(
        <Sheet open={isModalOpen} onOpenChange={handleCloseModal} >
            <SheetContent side="bottom" className=" flex justify-center w-full" >
                <div className=" w-full max-w-3xl px-5 mx-auto py-10">
                    <SheetHeader >
                        <SheetTitle className=" text-center text-xl">Crear Equipo</SheetTitle>
                        <SheetDescription>Ingrese los detalles del equipo que desea registrar.</SheetDescription>
                    </SheetHeader>
                    <FormEquipo equipo={{ipv4:"",activo:true,propietario:""}} onSubmit={onSubmit} textoBoton="Crear Equipo" isLoading={loading}/>

                </div>
            </SheetContent>
        </Sheet>
    )
}
