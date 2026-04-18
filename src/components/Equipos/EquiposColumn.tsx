import { type ColumnDef } from "@tanstack/react-table"
import type { EquipoItem } from "@/types"
import { formatDate } from "@/utils/FormatUtil";
import ActionMenuTable from "./ActionMenuTable";

export const EquiposColumns: ColumnDef<EquipoItem>[] = [
    {
        accessorKey: "ipv4",
        header: "IP IPv4",
        cell: ({ row }) => (
            <div className="font-medium text-slate-700 dark:text-slate-200">
                {row.getValue("ipv4")}
            </div>
        )
    },
    {
        accessorKey: "ipvpn",
        header: "IP VPN",
        cell: ({ row }) => {
            const ipVpn = row.getValue("ipvpn") as string | undefined;
            return (
                <div className="text-slate-500 dark:text-slate-400">
                    {ipVpn || <span className="text-slate-300">N/A</span>}
                </div>
            );
        }
    },
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
        accessorKey: "activo",
        header: () => <div className="text-center">Estado</div>,
        cell: ({ row }) => {
            const isActive = row.getValue("activo") as boolean;

            return (
                <div className="flex justify-center items-center">
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium gap-1.5 ${
                            isActive
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400"
                        }`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {isActive ? "Activo" : "Inactivo"}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-right">Fecha de Alta</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(row.getValue("createdAt"))}
                </div>
            );
        }
    },
    {
        id: "actions",
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => {
            const equipoId = row.original._id;
            return(
                <div className=" flex justify-end">
                    <ActionMenuTable id={equipoId}/>
                </div>
            )
        }

    }
]