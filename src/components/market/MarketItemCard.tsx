import { ArrowUpRight, ArrowDownRight, Flame, Activity, Trophy, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils"; 
import type { MarketItem } from "@/types"; 
import { useNavigate } from "react-router-dom";

interface MarketItemCardProps {
    item: MarketItem;
    className?: string;
}

export function MarketItemCard({ item, className }: MarketItemCardProps) {
    const isPositive = item.variacion >= 0;
    const navigate = useNavigate();
    const formatCurrency = (value: number) => {
        // Intl.NumberFormat ya pone el símbolo ($), pero no el código (USD) por defecto
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.moneda,
            minimumFractionDigits: 2,
        }).format(value);
    };

    const formatVariation = (value: number) => {
        return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "TRENDING": return <Flame className="size-3.5 text-orange-500" />;
            case "TOP MOVER": return <Activity className="size-3.5 text-blue-500" />;
            case "TOP_GAINER": return <Trophy className="size-3.5 text-yellow-500" />;
            case "TOP_LOSER": return <TrendingDown className="size-3.5 text-purple-500" />;
            default: return null;
        }
    };

    const handleClick = () => {
        navigate(`/stock/${item.ticker}`)
    }

    return (
        <div
            className={cn(
                "group flex items-center justify-between p-3 rounded-lg border border-transparent bg-background hover:bg-muted/50 hover:border-border transition-all cursor-pointer",
                className
            )}
            onClick={handleClick}
        >
            {/* IZQUIERDA: Icono + Ticker + Nombre */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-full bg-secondary/50 text-muted-foreground group-hover:bg-background group-hover:shadow-sm transition-colors">
                    {getTypeIcon(item.tipo) || <span className="text-xs font-bold">{item.ticker[0]}</span>}
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">
                            {item.ticker}
                        </span>
                        <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded-[4px] bg-secondary text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                            {item.tipo.replace("_", " ")}
                        </span>
                    </div>
                    <span className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-[180px]" title={item.nombre}>
                        {item.nombre}
                    </span>
                </div>
            </div>

            {/* DERECHA: Precio + Moneda + Variación */}
            <div className="flex flex-col items-end">
                {/* Contenedor flex para alinear Precio y Moneda */}
                <div className="flex items-baseline gap-1">
                    <span className="font-bold text-sm tabular-nums text-foreground">
                        {formatCurrency(item.precio)}
                    </span>
                    {/* AQUÍ ESTÁ LA MONEDA AGREGADA */}
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">
                        {item.moneda}
                    </span>
                </div>
                
                <div className={cn(
                    "flex items-center gap-1 text-xs font-medium tabular-nums",
                    isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}>
                    {isPositive ? (
                        <ArrowUpRight className="size-3" />
                    ) : (
                        <ArrowDownRight className="size-3" />
                    )}
                    {formatVariation(item.variacion)}
                </div>
            </div>
        </div>
    );
}