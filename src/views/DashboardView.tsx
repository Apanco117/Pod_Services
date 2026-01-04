import { getPortfolio } from "@/api/ReqPortafolio";
import type { PortfolioItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/FormatUtil";
import { useMemo } from "react";
import { ArrowDownRight, ArrowUpRight, DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { DataTable } from "@/components/Table/data-table";
import { columns } from "@/components/dashboard/columns";

export default function DashboardView() {
    const {data, isLoading, isError} = useQuery<PortfolioItem[]>({
        queryKey: ['portfolioItems'],
        queryFn : () => getPortfolio(),
    })

    const loading = isLoading;
    const error = isError;

    const resumen = useMemo(() => {
        if (!data) return { totalValor: 0, totalGanancia: 0, totalCosto: 0, totalRendimiento: 0 };
        
        const totalValor = data.reduce((acc, item) => acc + Number(item.valorActual), 0);
        const totalCosto = data.reduce((acc, item) => acc + Number(item.costoTotalReal), 0);
        const totalGanancia = totalValor - totalCosto;
        
        // Cálculo del porcentaje global: (Ganancia / Costo) * 100
        // Evitamos división por cero
        const totalRendimiento = totalCosto === 0 ? 0 : (totalGanancia / totalCosto) * 100;

        return { totalValor, totalGanancia, totalCosto, totalRendimiento };
    }, [data]);

    return (
        <div className=" w-full pt-5 pb-10">
            {loading ? (
                <LoadingSkeleton />
            ) : error ? (
               errorDiv()
            ) : (
                <>
                
                    {data ? (
                        <div className="w-full pt-5 pb-10 px-4 space-y-8">  
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <KPICard 
                                    title="Valor Total" 
                                    value={resumen.totalValor} 
                                    icon={<Wallet className="text-primary" />} 
                                />

                                <KPICard 
                                    title="Costo Total" 
                                    value={resumen.totalCosto} 
                                    icon={<DollarSign className="text-slate-500" />} 
                                    subtext="Dinero invertido real"
                                />

                                <KPICard 
                                    title="P&L Total" 
                                    value={resumen.totalGanancia}       // Dinero ($)
                                    percentage={resumen.totalRendimiento} // Porcentaje (%) <--- NUEVA PROP
                                    isPnl 
                                    icon={resumen.totalGanancia >= 0 
                                        ? <TrendingUp className="text-emerald-500" /> 
                                        : <TrendingDown className="text-rose-500" />
                                    } 
                                />

                            </div>

                            <div>
                                <DataTable columns={columns} data={data} />
                            </div>
                            
                        </div>
                    ) : (
                        errorDiv()
                    )}
                </>
            )}
        </div>
    )
}

function KPICard({ title, value, percentage, icon, isPnl, subtext }: any) {
    
    // Para el color del icono principal, usamos 'value' (Dinero) para saber si es verde/rojo
    const isPositiveValue = value >= 0;

    const iconColorClass = isPnl 
        ? (isPositiveValue ? 'text-emerald-500' : 'text-rose-500')
        : 'text-primary';

    // Para la flecha y el texto pequeño, usamos 'percentage' si existe, o 'value' como fallback
    const displayPercentage = percentage ?? 0; 
    const isPositivePercent = displayPercentage >= 0;

    const trendIcon = isPnl 
        ? (isPositivePercent ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />) 
        : null;

    return (
        <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-black p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700">
            
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {title}
                    </p>
                    {/* AQUI VA EL DINERO ($) */}
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {formatCurrency(value)} 
                    </h2>
                </div>

                <div className={`${iconColorClass} p-1`}>
                    {icon}
                </div>
            </div>

            <div className="mt-4 flex items-center">
                {isPnl ? (
                     <span className={`flex items-center text-xs font-medium ${isPositivePercent ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {trendIcon}
                        {/* AQUI VA EL PORCENTAJE (%) CORREGIDO */}
                        {isPositivePercent ? '+' : ''}{Number(displayPercentage).toFixed(2)}%
                        
                        <span className="ml-2 text-slate-400 dark:text-slate-600 font-normal">rendimiento total</span>
                    </span>
                ) : (
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                        {subtext || "Actualizado en tiempo real"}
                    </p>
                )}
            </div>
            
            {!isPnl && (
                <div className="absolute bottom-0 left-0 h-1 w-full bg-primary" />
            )}
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="w-full pt-5 px-4 space-y-8">
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
        </div>
    );
}

function errorDiv(){
    return (
        <div className=" w-full">
            <h2 className="text-xl font-bold">Error al cargar</h2>
            <p className=" text-accent">Hubo un error al visualizar la informacion del portafolio</p>
        </div>
    )
}