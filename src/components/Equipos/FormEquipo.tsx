import type { EquipoFormData } from "@/types"
import { EquipoFormSchema } from "@/types/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {Field,FieldDescription,FieldError,FieldGroup,FieldLabel} from "@/components/ui/field"
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

type FormValues = {
    equipo : EquipoFormData,
    onSubmit: (data: EquipoFormData) => void;
    textoBoton?: string;
    isLoading: boolean;
}

export default function FormEquipo({equipo, onSubmit, textoBoton, isLoading} : FormValues) {
    const form = useForm<EquipoFormData>({resolver: zodResolver(EquipoFormSchema),defaultValues:equipo})

    return (
        <form id="form-equipo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                {/* === Ip V4 === */}
                <Controller
                    control={form.control}
                    name="ipv4"
                    render={ ({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className=" w-full">
                            <FieldLabel htmlFor="equipo-ipv4">Ip V4</FieldLabel>
                            <Input
                                {...field}
                                id="equipo-ipv4"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ingrese la ip del equipo"
                                autoComplete="off"
                            />
                            <FieldDescription>
                                Ingrese la ip del equipo que desea registrar
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    ) }
                />

                 <Controller
                    control={form.control}
                    name="ipvpn"
                    render={ ({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className=" w-full">
                            <FieldLabel htmlFor="equipo-ipvpn">IP VPN</FieldLabel>
                            <Input
                                {...field}
                                id="equipo-ipvpn"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ingrese la IP VPN del equipo"
                                autoComplete="off"
                            />
                            <FieldDescription>
                                Ingrese la IP VPN del equipo que desea registrar
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    ) }
                />

                <Controller
                    control={form.control}
                    name="propietario"
                    render={ ({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className=" w-full">
                            <FieldLabel htmlFor="equipo-propietario">Propietario</FieldLabel>
                            <Input
                                {...field}
                                id="equipo-propietario"
                                aria-invalid={fieldState.invalid}
                                placeholder="Ingrese el propietario del equipo"
                                autoComplete="off"
                            />
                            <FieldDescription>
                                Ingrese el propietario del equipo que desea registrar
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    ) }
                />

                <Controller
                    control={form.control}
                    name="activo"
                    render={ ({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className=" w-full">
                            <FieldLabel htmlFor="equipo-activo">Activo</FieldLabel>
                            <Select 
                                value={field.value ? "true" : "false"} 
                                onValueChange={(val) => field.onChange(val === "true")}
                                name="activo"
                            >
                                <SelectTrigger aria-invalid>
                                    <SelectValue placeholder="Seleccione un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="true">Activo</SelectItem>
                                    <SelectItem value="false">Inactivo</SelectItem>
                                </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                Ingrese el estado del equipo que desea registrar
                            </FieldDescription>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    ) }
                />
            </FieldGroup>
            <div className="flex justify-end pt-8">
                <Button 
                    type="submit" 
                    variant={"ghost"} 
                    disabled={isLoading}
                    className=" border-2 cursor-pointer border-sidebar-primary px-10 w-full"
                >
                    {isLoading ? <div className=" flex gap-1">
                        <Loader2 className=" animate-spin"/>
                        <span>Cargando</span>
                    </div> : textoBoton}
                </Button>
            </div>
        </form>
    )
}
