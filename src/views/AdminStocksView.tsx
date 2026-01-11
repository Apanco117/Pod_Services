import { getStocks } from "@/api/ReqAdmin"
import { AdminStockCard } from "@/components/admin/AdminStockCard"
import ErrorData from "@/components/ErrorData"
import GenericLoadingSkeleton from "@/components/GenericLoadingSkeleton"
import type { AdminStockItem } from "@/types"
import { useQuery } from "@tanstack/react-query"


export default function AdminStocksView() {

    const {data, isLoading, isError} = useQuery<AdminStockItem[]>({
        queryKey:["stocks"],
        queryFn: () => getStocks()
    })

    const loading = isLoading

    return(
        <div className="w-full max-w-7xl mx-auto p-2 md:p-8 space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Stocks</h2>
                    <p className="text-muted-foreground">
                        Administra los stocks del sistema
                    </p>
                </div>
            </div>
            {loading ? <>
                <GenericLoadingSkeleton/>
            </> : isError ? <>
                <ErrorData/>
            </> : data ? <div className=" w-full flex-col space-y-1">
                {data.map( (stock) => (
                    <AdminStockCard key={stock._id} item={stock} />
                ) )}
            </div> : <>
                <ErrorData/>
            </> }
        </div>
    )
}