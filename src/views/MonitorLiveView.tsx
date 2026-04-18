import { getMonitorLive } from "@/api/ReqMonitor"
import ErrorData from "@/components/ErrorData";
import { MonitorLiveColumns } from "@/components/Monitor/MonitorLiveColumns";
import { DataTable } from "@/components/Table/data-table";
import type { LiveConnectionResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

export default function MonitorLiveView() {

    const {data, isLoading, isError} = useQuery<LiveConnectionResponse>({
        queryKey: ['monitorLive'],
        queryFn : () => getMonitorLive(),
    })

    const loading = isLoading;

    return (
        <div className=" w-full pt-5 pb-10">
            <div className="w-full pt-5 pb-10 px-4 space-y-8">
                <div className="flex flex-col flex-wrap gap-4 w-full">
                    <div className=" w-full">
                        <h2 className="text-3xl font-bold tracking-tight">Conexiones activas</h2>
                        <p className="text-muted-foreground">
                            Consulte las conexiones activas al websocket
                        </p>
                    </div>
                    <div className=" w-full">
                        {loading ? <>
                            <DataTable columns={MonitorLiveColumns} data={[]} isLoading={true} />
                        </> : isError ? <>
                            <ErrorData/>
                        </> : data ? <>
                            <DataTable columns={MonitorLiveColumns} data={data.data} isLoading={false} messageEmpty="No hay conexiones activas" />
                        </> : <>
                            <ErrorData/>
                        </>}

                    </div>
                </div>
            </div>
        </div>

    )
}
