import { Database, Clock, AlertTriangle, CheckCircle2, PauseCircle } from "lucide-react";
import { cn } from "@/lib/utils"; 
// Asumiendo que tu tipo generado con Zod está aquí
import type { AdminStockItem } from "@/types"; 
import { Badge } from "../ui/badge";

interface AdminStockCardProps {
    item: AdminStockItem;
    className?: string;
}

export function AdminStockCard({ item, className }: AdminStockCardProps) {
    const today = new Date();
    const lastCandle = item.lastCandleDate ? new Date(item.lastCandleDate) : null;
    
    const daysSinceUpdate = lastCandle 
        ? Math.floor((today.getTime() - lastCandle.getTime()) / (1000 * 60 * 60 * 24))
        : 999;

    const isStale = daysSinceUpdate > 3;
    const hasData = item.totalDataPoints > 0;

    // 2. Formateadores
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.currency,
            minimumFractionDigits: 2,
        }).format(value);
    };

    const formatDate = (date?: string | null) => {
        if (!date) return "Sin datos";
        return new Intl.DateTimeFormat("es-MX", { 
            month: "short", day: "numeric" 
        }).format(new Date(date));
    };

    // 3. Extracción de iniciales (Tu requerimiento)
    const tickerInitials = item.ticker.slice(0, 2).toUpperCase();

    return (
        <div
            className={cn(
                "group flex items-center justify-between p-3 rounded-lg border border-transparent bg-background hover:bg-muted/50 hover:border-border transition-all cursor-default",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "flex items-center justify-center size-10 rounded-full font-bold text-sm transition-colors",
                    !hasData ? "bg-red-100 text-red-600 dark:bg-red-900/30" :
                    isStale ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30" :
                    "bg-secondary/80 text-foreground group-hover:bg-background group-hover:shadow-sm"
                )}>
                    {tickerInitials}
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">
                            {item.ticker}
                        </span>
                        <Badge
                            variant="outline" 
                            className={cn(
                                "gap-1 px-1.5 py-0.5 text-[10px] font-medium tracking-wider h-auto",
                                
                                
                                item.isSystemTracked 
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20" 
                                    : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                            )}
                        >
                            {item.isSystemTracked ? (
                                <>
                                    <CheckCircle2 className="size-3" />
                                    <span>AUTO</span>
                                </>
                            ) : (
                                <>
                                    <PauseCircle className="size-3" />
                                    <span>MANUAL</span>
                                </>
                            )}
                        </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-[180px]" title={item.name}>
                        {item.name}
                    </span>
                </div>
            </div>

            {/* DERECHA: Métricas de Admin (Cantidad y Fechas) */}
            <div className="flex flex-col items-end gap-1">
                {/* Precio actual (Referencia rápida) */}
                <div className="flex items-baseline gap-1">
                    <span className="font-bold text-sm tabular-nums text-foreground">
                        {formatCurrency(item.lastPrice)}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">
                        {item.currency}
                    </span>
                </div>
                
                {/* Estadísticas de Base de Datos */}
                <div className="flex items-center gap-3 text-xs">
                    {/* Contador de Velas */}
                    <div className={cn(
                        "flex items-center gap-1 font-medium tabular-nums",
                        hasData ? "text-muted-foreground" : "text-red-500"
                    )} title="Total velas guardadas">
                        <Database className="size-3" />
                        {item.totalDataPoints}
                    </div>

                    {/* Fecha última actualización */}
                    <div className={cn(
                        "flex items-center gap-1 font-medium tabular-nums",
                        !hasData ? "text-muted-foreground" :
                        isStale ? "text-yellow-600 dark:text-yellow-500" : "text-emerald-600 dark:text-emerald-400"
                    )} title={`Última vela: ${item.lastCandleDate}`}>
                        {isStale ? <AlertTriangle className="size-3" /> : <Clock className="size-3" />}
                        {formatDate(item.lastCandleDate)}
                    </div>
                </div>
            </div>
        </div>
    );
}