import { type ColumnDef } from "@tanstack/react-table"
import type { NodoItem } from "@/types" 

export const NodosSitColumns: ColumnDef<NodoItem>[] = [
    {
        accessorKey: "propietario",
        header: "Propietario",
        cell: ({ row }) => (
            <div className="font-medium text-slate-700 dark:text-slate-200">
                {row.getValue("propietario")}
            </div>
        )
    },
    {
        accessorKey: "ip", 
        header: "IP Origen",
        cell: ({ row }) => (
            <div className="text-slate-600 dark:text-slate-300">
                {row.getValue("ip")}
            </div>
        )
    },
    {
        id: "nodo",
        header: "Nodo",
        cell: ({ row }) => {
            const nodo = row.original.data?.data?.Nodo;
            
            return (
                <div className="text-slate-600 dark:text-slate-300">
                    {nodo ? nodo : <span className="text-slate-400 italic">N/A</span>}
                </div>
            );
        }
    },
    {
        id: "path",
        header: "Path",
        cell: ({ row }) => {
            const path = row.original.data?.data?.Path;
            
            return (
                <div className="text-slate-500 dark:text-slate-400 font-mono text-sm">
                    {path ? path : <span className="text-slate-400 italic">N/A</span>}
                </div>
            );
        }
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Estado</div>,
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const isOk = status === "OK";

            return (
                <div className="flex justify-center items-center">
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium gap-1.5 ${
                            isOk
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400"
                        }`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${isOk ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {isOk ? "Completado" : "Timeout"}
                    </span>
                </div>
            );
        }
    }
]