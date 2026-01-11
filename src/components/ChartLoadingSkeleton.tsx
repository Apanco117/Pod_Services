import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ChartBarInteractiveSkeleton() {
    return (
        <Card className="py-0">
            {/* 1. Header: Replicamos la misma estructura flex que el original */}
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                
                {/* Parte Izquierda: Título y Descripción */}
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                <Skeleton className="h-6 w-32" /> {/* Título */}
                <Skeleton className="h-4 w-48 mt-1" /> {/* Descripción */}
                </div>

                {/* Parte Derecha: Los botones simulados */}
                <div className="flex">
                {/* Simulamos el botón "Desktop" */}
                <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 sm:border-t-0 sm:border-l sm:px-8 sm:py-6 min-w-[120px]">
                    <Skeleton className="h-4 w-16 mb-1" /> {/* Label */}
                    <Skeleton className="h-8 w-24" />    {/* Número Grande */}
                </div>

                {/* Simulamos el botón "Mobile" */}
                <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 sm:border-t-0 sm:border-l sm:px-8 sm:py-6 min-w-[120px]">
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-8 w-24" />
                </div>
                </div>
            </CardHeader>

            {/* 2. Content: El área del gráfico */}
            <CardContent className="px-2 sm:p-6">
                <div className="aspect-auto h-[250px] w-full flex items-end justify-between gap-1 pt-4">
                    {/* OPCIÓN A: Un bloque sólido (Más limpio) */}
                    <Skeleton className="h-full w-full rounded-md" />

                    {/* OPCIÓN B: (Opcional) Si quieres que parezcan barritas cargando, 
                    puedes usar este loop en lugar del Skeleton único de arriba: 
                    */}
                    {/* {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} className={`w-full rounded-sm h-[${Math.floor(Math.random() * 100)}%]`} style={{ height: `${Math.random() * 60 + 20}%` }} />
                    ))} 
                    */}
                </div>
            </CardContent>
        </Card>
    )
}