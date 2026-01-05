import { Skeleton } from "./ui/skeleton";

export default function GenericLoadingSkeleton() {
    return (
        <div className="w-full h-full p-6 space-y-6">
            {/* 1. Header Section: Título y Botón de acción ficticio */}
            <div className="flex justify-between items-center mb-8">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48 md:w-64 rounded-lg" />
                    <Skeleton className="h-4 w-24 md:w-32 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full md:w-32 md:rounded-md" /> {/* Botón o Avatar */}
            </div>

            {/* 2. Stats/KPI Grid: Responsivo (1 col en móvil, 3 en desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-28 w-full rounded-xl shadow-sm" />
                <Skeleton className="h-28 w-full rounded-xl shadow-sm" />
                <Skeleton className="h-28 w-full rounded-xl shadow-sm" />
            </div>

            {/* 3. Main Content Area: Simula una tabla o panel complejo */}
            <div className="space-y-4 pt-4">
                {/* Simulamos la cabecera de una tabla o filtros */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-1/4 rounded-lg" />
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>
                
                {/* El bloque grande de contenido */}
                <Skeleton className="h-100 w-full rounded-xl shadow-sm" />
            </div>
        </div>
    )
}
