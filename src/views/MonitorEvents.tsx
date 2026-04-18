import { getMonitorEvents } from "@/api/ReqMonitor"
import ErrorData from "@/components/ErrorData"
import { LogMonitorColumns } from "@/components/Monitor/LogMonitorColumns"
import { DataTable } from "@/components/Table/data-table"
import type { LogConexionResponse, MonitorFilters } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { formatDate } from "@/utils/FormatUtil"
import { Input } from "@/components/ui/input"


export default function MonitorEvents() {

    const [filters, setFilters] = useState<MonitorFilters>({
        date: "",
        event: "",
        ip: ""
    });

    const [date, setDate] = useState<Date>( new Date())
    const [localIp, setLocalIp] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, ip: localIp }));
        }, 500); 
        return () => clearTimeout(timer);
    }, [localIp]);

    const {data, isLoading, isError} = useQuery<LogConexionResponse>({
        queryKey: ['monitorEvents', filters],
        queryFn : () => getMonitorEvents(filters),
    })
    useEffect(() => {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const fechaFormateada = `${year}-${month}-${day}`;

            setFilters(prev => ({ ...prev, date: fechaFormateada }));
        } else {
            setFilters(prev => ({ ...prev, date: "" }));
        }
    }, [date]);

    const loading = isLoading

    return (
        <div className=" w-full pt-5 pb-10">
            <div className="w-full pt-5 pb-10 px-4 space-y-8">  
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Eventos de conexion</h2>
                        <p className="text-muted-foreground">
                            Consulte los eventos de conexion
                        </p>
                    </div>
                </div>

                <div>
                    <div className=" flex flex-col justify-center">
                        <div className="flex flex-wrap gap-4 mb-6 bg-principal p-4 rounded-lg">

                            <Field className="w-full max-w-48">
                                <FieldLabel>Filtrar por Estado</FieldLabel>
                                <Select 
                                    value={filters.event === "" ? "TODOS" : filters.event}
                                    onValueChange={(value) => setFilters({
                                        ...filters, 
                                        event: value === "TODOS" ? "" : value
                                    })} 
                                    name="event"
                                >
                                    <SelectTrigger aria-invalid>
                                        <SelectValue placeholder="Seleccione un evento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="TODOS">Todos los eventos</SelectItem>
                                        <SelectItem value="CONECTADO">Conectado</SelectItem>
                                        <SelectItem value="DESCONECTADO">Desconectado</SelectItem>
                                        <SelectItem value="ERROR">Error</SelectItem>
                                        <SelectItem value="TIMEOUT">Timeout</SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field className="w-full max-w-48">
                                <FieldLabel>Filtrar por Fecha</FieldLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            data-empty={!date}
                                            className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                            >
                                            {date ? formatDate(date.toDateString()) : <span>Pick a date</span>}
                                        <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            defaultMonth={date}
                                            required
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Field>

                            <Field className="w-full max-w-48">
                                <FieldLabel>Filtrar por IP</FieldLabel>
                                <Input 
                                    id="ip"     
                                    type="text" 
                                    name="ip"
                                    placeholder="Ingrese la IP" 
                                    value={localIp}
                                    onChange={(e) => setLocalIp(e.target.value)}
                                />
                            </Field>

                            <Field className="w-full max-w-48">
                                <FieldLabel>Limpiar filtros</FieldLabel>
                                <Button variant="outline" onClick={() => {
                                    setFilters({
                                        date: "",
                                        event: "",
                                        ip: ""
                                    });
                                    setDate(new Date());
                                    setLocalIp("");
                                }}>Limpiar</Button>
                            </Field>
                            
                        </div>
                        {loading ? <>
                            <DataTable columns={LogMonitorColumns} data={[]} isLoading={true} />
                        </> : isError ? <>
                            <ErrorData/>
                        </> : data ? <>
                            <DataTable columns={LogMonitorColumns} data={data.data} isLoading={false} />
                        </> : <>
                            <ErrorData/>
                        </>}
                    </div>

                    
                </div>
                
            </div>
        </div>
    )
}
