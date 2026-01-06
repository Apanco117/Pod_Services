// src/components/market/MarketList.tsx
import { Skeleton } from "../ui/skeleton";
import { MarketItemCard } from "./MarketItemCard"; // Opcional, si quieres scroll interno
import type { MarketItem } from "@/types";

interface MarketListProps {
    items: MarketItem[];
    title?: string;
    loading?: boolean;
}

export function MarketList({ items, title, loading }: MarketListProps) {
    if (loading) return (
        <div className=" w-full space-y-2">
            {title && <h3 className="font-semibold text-lg tracking-tight">{title}</h3>}    
            <Skeleton className=" w-full p-3"/>
            <Skeleton className=" w-full p-3"/>
            <Skeleton className=" w-full p-3"/>
            <Skeleton className=" w-full p-3"/>
        </div>
    )

    return (
        <div className="space-y-4">
            {/* El título solo lo mostramos si nos lo pasan (útil para Desktop) */}
            {title && <h3 className="font-semibold text-lg tracking-tight">{title}</h3>}
            
            <div className="flex flex-col gap-2">
                {items.map((item) => (
                    <MarketItemCard 
                        key={item.ticker} 
                        item={item} 
                    />
                ))}
            </div>
        </div>
    );
}