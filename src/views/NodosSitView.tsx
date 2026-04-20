import { getNodosSit } from "@/api/ReqSit";
import ErrorData from "@/components/ErrorData";
import { NodosSitColumns } from "@/components/SIT/SitColumns";
import { DataTable } from "@/components/Table/data-table";
import { useQuery } from "@tanstack/react-query";

export default function NodosSitView() {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['nodosSit'],
        queryFn : () => getNodosSit(),
    })

    const loading = isLoading;

    return (
        <div className=" w-full pt-5 pb-10">
            <div className="w-full pt-5 pb-10 px-4 space-y-8">
                <div className="flex flex-col flex-wrap gap-4 w-full">
                    <div className=" w-full">
                        <h2 className="text-3xl font-bold tracking-tight">Nodos SIT</h2>
                        <p className="text-muted-foreground">
                            Visualice los nodos registrados en el SIT.
                        </p>
                    </div>
                    <div className=" w-full">
                        {loading ? <>
                            <DataTable columns={NodosSitColumns} data={[]} isLoading={true} />
                        </> : isError ? <>
                            <ErrorData/>
                        </> : data ? <>
                            <DataTable columns={NodosSitColumns} data={data.data} isLoading={false} messageEmpty="No hay conexiones activas" />
                        </> : <>
                            <ErrorData/>
                        </>}

                    </div>
                </div>
            </div>
        </div>
    )
}
