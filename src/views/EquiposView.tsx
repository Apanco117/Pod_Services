import { getAllEquipos } from "@/api/ReqEquipos";
import CrearEquipoModal from "@/components/Equipos/CrearEquipoModal";
import EditarEquipoModal from "@/components/Equipos/EditarEquipoModal";
import { EquiposColumns } from "@/components/Equipos/EquiposColumn";
import ErrorData from "@/components/ErrorData";
import { DataTable } from "@/components/Table/data-table";
import { Button } from "@/components/ui/button";
import type { EquiposResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'react-router-dom';

export default function EquiposView() {

    const [searchParams, setSearchParams] = useSearchParams();

    const {data, isLoading, isError} = useQuery<EquiposResponse>({
        queryKey: ['equipos'],
        queryFn : () => getAllEquipos(),
    })

    const loading = isLoading;

    const createElement = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("crearEquipo", "true");
        setSearchParams(newParams);
    }

    return (
        <div className=" w-full pt-5 pb-10">
            <div className="flex flex-col flex-wrap gap-4 w-full">
                <div className=" w-full">
                    <h2 className="text-3xl font-bold tracking-tight">Equipos registrados</h2>
                    <p className="text-muted-foreground">
                        Consulte los equipos registrados en el sistema para ejecutar tareas
                    </p>
                </div>
                <div className=" w-full">
                    <Button 
                        onClick={createElement}
                        variant={"ghost"} 
                        className=" border-2 cursor-pointer hover:border-sidebar-primary px-10 w-full md:w-auto"
                    >
                        Crear
                    </Button>
                </div>
                <div className=" w-full">
                    {loading ? <>
                        <DataTable columns={EquiposColumns} data={[]} isLoading={true} />
                    </> : isError ? <>
                        <ErrorData/>
                    </> : data ? <>
                        <DataTable columns={EquiposColumns} data={data.data} isLoading={false} messageEmpty="No hay conexiones activas" />
                    </> : <>
                        <ErrorData/>
                    </>}

                </div>
            </div>
            <CrearEquipoModal/>
            <EditarEquipoModal  />
        </div>
    )
}
