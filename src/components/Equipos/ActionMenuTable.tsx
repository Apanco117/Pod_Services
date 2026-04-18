import { Loader2, MoreHorizontal, Pencil, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { EquipoItem } from "@/types"
import { useSearchParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteEquipoById } from "@/api/ReqEquipos"
import { toast } from "sonner"
import { useState } from "react"

type ActionMenuTableProps = {
    id: EquipoItem["_id"],
}

export default function ActionMenuTable({id} : ActionMenuTableProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: deleteEquipoById,
        onSuccess: (data) => {
            toast.success(`${data.message}`, {
                duration: 4000,
            });
            queryClient.invalidateQueries({ queryKey: ["equipos"] });
            queryClient.invalidateQueries({ queryKey: ["equipo", id] });
            setLoading(false);
        },
        onError: (error) => {
             toast.error(error.message || 'Error al eliminar el equipo',{
                description: 'Por favor intenta nuevamente',
                duration: 4000,
            });
            setLoading(false);
        }
    })

    const handleEdit = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("editEquipo", id);
        setSearchParams(newParams);
    }

    const handleDelete = async () => {
        setLoading(true);
        await mutation.mutateAsync(id);
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild onClick={handleEdit}>
                    <div className="w-full flex justify-start items-center">
                        <Pencil/>
                        <span>Editar</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} disabled={loading} className="hover:text-red-500" asChild>
                    <div className="w-full flex justify-start items-center text-red-500 ">
                        {loading ? <>
                            <Loader2 className=" animate-spin"/>
                            <span>Eliminando...</span>
                        </> : <>
                            <Trash className=" text-red-500"/>
                            <span>Eliminar</span>
                        </>}

                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
