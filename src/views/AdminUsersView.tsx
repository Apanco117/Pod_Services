import { 
    Download, 
    Plus
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/ReqUsers";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types";
import { DataTable } from "@/components/Table/data-table";
import { UsersColumn } from "@/components/usuarios/UsersColumn";

export default function AdminUsersView() {

    const { data, isLoading, isError } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => getUsers()
    })

    const loading = isLoading;

    return (
        <div className="w-full max-w-7xl mx-auto p-2 md:p-8 space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
                    <p className="text-muted-foreground">
                        Gestiona el acceso y los roles de tu equipo.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className=" w-1/2 md:w-auto flex items-center cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                    </Button>
                    <Button variant="outline" className="w-1/2 md:w-auto flex items-center border-2 border-primary dark:border-primary cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Invitar Usuario
                    </Button>
                </div>
            </div>
            {loading ? 
                <div className = "space-y-2">
                    <Skeleton className=" w-full p-6"/>
                    <Skeleton className=" w-full p-6"/>
                    <Skeleton className=" w-full p-6"/>
                </div>
                : isError ? 
                <></>
                : data ?
                <div>
                    <DataTable columns={UsersColumn} data={data} />
                </div>
                : 
                <></>
            }
        </div>
    )
}