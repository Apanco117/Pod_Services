import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/types"

// Helper para formatear fecha
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

export const UsersColumn: ColumnDef<User>[] = [
    {
        accessorKey: "nombre",
        header: "Usuario",
        cell: ({ row }) => {
            const user = row.original
            const initials = user.nombre.slice(0, 2).toUpperCase()

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        {/* Si tuvieras foto, iría aquí. Usamos fallback por ahora */}
                        <AvatarImage src="" alt={user.nombre} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                            {user.nombre}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                            {user.email}
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({ }) => (
            <div className="hidden sm:block">Rol</div>
        ),
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            const isAdmin = role === "ADMIN"

            return (
                <div className="hidden sm:flex items-center">
                    {isAdmin ? (
                        <Badge variant="secondary" className="text-slate-500 bg-primary/10 dark:bg-primary/20 dark:text-primary">
                            Admin
                        </Badge>
                    ) : (
                        <Badge variant="secondary" className="text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400">
                            Usuario
                        </Badge>
                    )}
                </div>
            )
        },
    },
    // 3. Status (Activo / Inactivo)
    {
        accessorKey: "activo",
        header: "Estado",
        cell: ({ row }) => {
            const isActive = row.getValue("activo") as boolean

            return (
                <div className="flex items-center">
                    <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium gap-1.5
                        ${isActive
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400"
                            }`}
                    >
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {isActive ? "Activo" : "Inactivo"}
                    </span>
                </div>
            )
        },
    },

    {
        accessorKey: "confirmado",
        header: ({ }) => (
            <div className="hidden lg:block text-center">Verificado</div>
        ),
        cell: ({ row }) => {
            const isConfirmed = row.getValue("confirmado") as boolean
            return (
                <div className="hidden lg:flex justify-center">
                    {isConfirmed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                        <XCircle className="h-5 w-5 text-slate-300" />
                    )}
                </div>
            )
        },
    },
    // 5. Fecha de Creación
    {
        accessorKey: "createdAt",
        header: ({ }) => (
            <div className="hidden xl:block text-right">Registrado</div>
        ),
        cell: ({ row }) => {
            return (
                <div className="hidden xl:block text-right text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(row.getValue("createdAt"))}
                </div>
            )
        },
    },
    // 6. Acciones (Dropdown)
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user._id)}>
                                Copiar ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-rose-600 focus:text-rose-600">
                                Desactivar cuenta
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]