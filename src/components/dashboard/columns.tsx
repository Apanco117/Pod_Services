import type { PortfolioItem } from "@/types"
import { formatCurrency } from "@/utils/FormatUtil"
import { type ColumnDef } from "@tanstack/react-table"

export const columns : ColumnDef<PortfolioItem>[] = [
    {
       accessorKey: "ticker",
        header: "Activo",
        cell: ({ row }) => {
            const ticker = row.original.ticker
            const nombre = row.original.nombre
            return (
                <div className="flex flex-col space-y-1">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {ticker}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-50">
                        {nombre}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "titulos",
        header: ({ column }) => {
            column
            return (
                <div className="text-right">Títulos</div>
            )
        },
        cell: ({ row }) => <div className="text-right font-medium">{row.getValue("titulos")}</div>,
    },
    {
        accessorKey: "costoPromedio",
        header: () => <div className="text-right">Costo Prom.</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("costoPromedio"))
            return <div className="text-right">{formatCurrency(amount)}</div>
        },
    },
    {
        accessorKey: "precioMercado",
        header: () => <div className="text-right">Precio Mercado</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("precioMercado"))
            return <div className="text-right font-medium">{formatCurrency(amount)}</div>
        },
    },
    {
        accessorKey: "valorActual",
        header: () => <div className="text-right">Valor Total</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("valorActual"))
            return <div className="text-right font-bold text-slate-900 dark:text-white">{formatCurrency(amount)}</div>
        },
    },
    {
        accessorKey: "ganancia",
        header: () => <div className="text-right">P/L ($)</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ganancia"))
            const color = amount >= 0 ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500"
            
            return (
                <div className={`text-right font-medium ${color}`}>
                    {amount > 0 ? "+" : ""}{formatCurrency(amount)}
                </div>
            )
        },
    },
    {
        accessorKey: "rendimiento",
        header: () => <div className="text-right">Rendimiento</div>,
        cell: ({ row }) => {
            const rawValue = row.getValue("rendimiento") as string // Viene como "-1.32%"
            const numericValue = parseFloat(rawValue) // JS convierte "-1.32%" a -1.32
            
            const isPositive = numericValue >= 0
            
            return (
                <div className="flex justify-end">
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                        ${isPositive 
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400" 
                            : "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400"
                        }`}
                    >
                        {rawValue}
                    </span>
                </div>
            )
        },
    },
]