import { type ColumnDef } from "@tanstack/react-table"
import type { LogConexion } from "@/types"
import { formatDate, formatTime } from "@/utils/FormatUtil"



export const LogMonitorColumns: ColumnDef<LogConexion>[] = [
    {
        accessorKey:"ip",
        header: "IP",
    },
    {
        accessorKey: "fecha",
        header: ({ }) => (
            <div className="text-right">Fecha</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(row.getValue("fecha"))}
                </div>
            )
        },
    },
    {
        accessorKey: "hora",
        header: ({ }) => (
            <div className="text-right">Hora</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                    {formatTime(row.getValue("fecha"))}
                </div>
            )
        },
    },
    {
        accessorKey:"evento",
        header: ({ }) => (
            <div className="text-center">Evento</div>
        ),
        cell: ({ row }) => {
            const evento = row.getValue("evento") as "CONECTADO" | "DESCONECTADO" | "ERROR" | "TIMEOUT";

            const configEvento = {
                CONECTADO: {
                    bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400",
                    dot: "bg-emerald-500",
                    label: "Conectado"
                },
                DESCONECTADO: {
                    bg: "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400",
                    dot: "bg-amber-500",
                    label: "Desconectado"
                },
                ERROR: {
                    bg: "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400",
                    dot: "bg-rose-500",
                    label: "Error"
                },
                TIMEOUT: {
                    bg: "bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-400",
                    dot: "bg-orange-500",
                    label: "Timeout"
                }
            };

            const currentStyle = configEvento[evento] || {
                bg: "bg-slate-100 text-slate-800 dark:bg-slate-500/10 dark:text-slate-400",
                dot: "bg-slate-500",
                label: evento || "Desconocido"
            };

            return (
                <div className="flex justify-center items-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium gap-1.5 ${currentStyle.bg}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${currentStyle.dot}`} />
                        {currentStyle.label}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "mensaje",
        header: ({ }) => (
            <div className="text-left">Mensaje</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="text-left text-sm text-slate-500 dark:text-slate-100">
                    {row.getValue("mensaje")}
                </div>
            )
        },
    },
]