import { 
    Download, 
    Plus, 
    Search, 
    SlidersHorizontal, 
    Users, 
    ShieldCheck, 
    UserX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";


export default function AdminUsersView() {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
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

            <div className="grid gap-4 md:grid-cols-3">
                <KpiCard 
                    title="Total Usuarios" 
                    value="2,350" 
                    description="+180.1% del mes pasado"
                    icon={<Users className="h-6 w-6 text-muted-foreground" />}
                />
                <KpiCard 
                    title="Administradores" 
                    value="12" 
                    description="Accesos de alto privilegio"
                    icon={<ShieldCheck className="h-6 w-6 text-muted-foreground" />}
                />
                <KpiCard 
                    title="Inactivos" 
                    value="45" 
                    description="Usuarios sin login > 30 días"
                    icon={<UserX className="h-6 w-6 text-muted-foreground" />}
                />
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Listado de Miembros</CardTitle>
                    <CardDescription>
                        Visualiza y administra a todos los usuarios registrados en la plataforma.
                    </CardDescription>
                </CardHeader>
                
                <CardContent>
                    {/* Barra de Herramientas (Search & Filter) */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Filtrar usuarios..." 
                                className="pl-9"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Vista
                        </Button>
                    </div>

                    {/* Placeholder del Empty State (Aquí iría tu <Table /> real) */}
                    <div className="flex flex-col items-center justify-center py-10 text-center border rounded-md border-dashed">
                        <div className="p-3 rounded-full bg-muted/50 mb-4">
                            <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg">No hay usuarios seleccionados</h3>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
                            Tus filtros no arrojaron resultados o aún no has cargado la información.
                        </p>
                        <Button variant="outline">Limpiar filtros</Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

// Subcomponente reutilizable usando Shadcn Card
function KpiCard({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}