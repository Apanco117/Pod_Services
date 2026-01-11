import { getDetailTicker } from "@/api/ReqStock";
import { ChartBarInteractiveSkeleton } from "@/components/ChartLoadingSkeleton";
import ErrorData from "@/components/ErrorData";
import GenericLoadingSkeleton from "@/components/GenericLoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StockDetail } from "@/types";
import { formatCompact, formatCurrency, formatPercentage } from "@/utils/FormatUtil";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type StockParams = {
    ticker: string;
};

export default function StockView() {
    const navigate = useNavigate();
    const { ticker } = useParams<StockParams>();
    if (!ticker){
        navigate("/market/tranding");
        return <ErrorData/>
    }
    const {data, isLoading, isError} = useQuery<StockDetail>({
        queryKey:["stock", ticker],
        queryFn: () => getDetailTicker(ticker)
    })

    const loading = isLoading
    
    return(
        <div className="w-full max-w-7xl mx-auto p-2 md:p-8 space-y-8">
            {loading ? <>
                <GenericLoadingSkeleton/>
            </> : isError ? <>
                <ErrorData/>
            </> : data ? <>
                <ViewData data={data}/>
            </> : <>
                <ErrorData/>
            </>}
        </div>
    )
}

type viewDataType = {
    data : StockDetail
}

function ViewData( {data} : viewDataType ){ 
    const navigate = useNavigate();
    const isPositive = data.change.direction === 'up' || data.change.amount >= 0;
    const VariationIcon = isPositive ? ArrowUpRight : ArrowDownRight;
    const colorClass = isPositive 
        ? "text-emerald-600 dark:text-emerald-400" 
        : "text-rose-600 dark:text-rose-400";

    return(
         <div className=" w-full">
            <div className="flex gap-4 flex-row items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{data.symbol}</h2>
                    <p className="text-muted-foreground">
                        {data.name}
                    </p>
                </div>
                <div className="flex justify-end gap-2">
                    <Button 
                        variant="outline" 
                        className=" rounded-full p-0 md:w-auto flex items-center justify-center cursor-pointer"
                        onClick={ () => navigate("/market/tranding") }
                    >
                        <ArrowLeft className="sm:mr-2 h-4 w-4" />
                        <p className=" hidden sm:flex">Volver</p>
                    </Button>
                </div>
            </div>
            <div className="w-auto pt-3 sm:pt-6 flex-cols items-center justify-center w-full">
                {/* Etiqueta Superior */}
                <p className="text-sm font-medium text-muted-foreground mb-1">
                    Precio Actual
                </p>

                {/* Fila Principal: Precio y Moneda */}
                <div className="flex items-baseline gap-2">
                    <span className="font-bold text-[30px] leading-none tabular-nums text-foreground tracking-tight">
                        {formatCurrency(data.price)}
                    </span>
                    <span className="text-xl font-medium text-muted-foreground uppercase self-end mb-1">
                        {data.currency}
                    </span>
                </div>

                <div className={cn("flex items-center gap-2 mt-2", colorClass)}>
                    <div className="flex items-center gap-0.5 bg-muted/20 px-1.5 py-0.5 rounded-md font-semibold text-xs">
                        <VariationIcon className="size-4" strokeWidth={2.5} />
                        <span className="tabular-nums">
                            {formatPercentage(data.change.percentage)}
                        </span>
                    </div>
                    
                    <span className="text-xs font-medium tabular-nums opacity-80">
                        ({formatCurrency(data.change.amount)}) Hoy
                    </span>
                </div>
            </div>

            <div className="w-auto pt-3 sm:pt-6 flex-cols items-center justify-center w-full">
                <ChartBarInteractiveSkeleton/>
            </div>

            <div className="w-auto pt-3 sm:pt-6 flex-cols items-center justify-center w-full">
                <Card className="py-0 px-2 sm:px-6">
                    <CardHeader className="flex py-4 text-2xl items-start ">
                        <h2>Detalles {" " + data.symbol  }</h2>
                        <Badge variant={"outline"} 
                            className="text-emerald-600 dark:text-emerald-600 border-1 border-emerald-600"
                        >
                            {data.currency}
                        </Badge>
                    </CardHeader>
                    <CardContent className=" w-full pb-5">
                        <DataRow
                            label="Cierre Anterior"
                            value={formatCurrency(data.statistics.previousClose)}
                            />

                            {/* 3. Mínimo del día */}
                            <DataRow
                            label="Mínimo del día"
                            value={formatCurrency(data.ranges.day.low)}
                            />

                            {/* 4. Máximo del día */}
                            <DataRow
                            label="Máximo del día"
                            value={formatCurrency(data.ranges.day.high)}
                            />

                            {/* 5. Mínimo 52 semanas */}
                            <DataRow
                            label="Mínimo 52 semanas"
                            value={formatCurrency(data.ranges.year.low)}
                            />

                            {/* 6. Máximo 52 semanas */}
                            <DataRow
                            label="Máximo 52 semanas"
                            value={formatCurrency(data.ranges.year.high)}
                            />

                            {/* 7. Volumen del día */}
                            <DataRow 
                                label="Volumen" 
                                value={formatCompact(data.statistics.volume)} 
                            />

                            {/* 9. Market Cap (Opcional, pero muy útil) */}
                            <DataRow
                            label="Cap. de Mercado"
                            value={formatCompact(data.statistics.marketCap)}
                            isLast // Quitamos el borde al último
                            />
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

const DataRow = ({ label, value, isLast = false }: { label: string, value: string, isLast?: boolean }) => (
    <div className={`flex w-full justify-between items-center py-3 ${!isLast ? 'border-b border-border' : ''}`}>
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium tabular-nums text-foreground">{value}</span>
    </div>
);