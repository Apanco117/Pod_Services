import type { LiveConnectionItem } from "@/types"
import { formatDate, formatTime } from "@/utils/FormatUtil"
import { type ColumnDef } from "@tanstack/react-table"


export const MonitorLiveColumns: ColumnDef<LiveConnectionItem>[] = [
    {
        accessorKey: "ipLocal",
        header: "IP Local",
        cell: ({ row }) => (
            <div className="font-medium text-slate-700 dark:text-slate-200">
                {row.getValue("ipLocal")}
            </div>
        )
    },
    {
        accessorKey: "socketId",
        header: () => (
            <div className="hidden sm:block">Socket ID</div>
        ),
        cell: ({ row }) => (
            <div className="hidden sm:block text-sm text-slate-500 dark:text-slate-400 font-mono">
                {row.getValue("socketId")}
            </div>
        )
    },
    {
        accessorKey: "conectadoDesde",
        header: () => (
            <div className="text-right">Fecha de Conexión</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(row.getValue("conectadoDesde"))}
                </div>
            )
        },
    },
    {
        id: "hora", 
        header: () => (
            <div className="text-right">Hora</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                    {formatTime(row.original.conectadoDesde)}
                </div>
            )
        },
    },
    {
        id: "estado",
        header: () => (
            <div className="text-center">Estado</div>
        ),
        cell: () => {
            return (
                <div className="flex justify-center items-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium gap-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        En Línea
                    </span>
                </div>
            );
        }
    }
]
