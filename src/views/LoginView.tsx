import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Field,FieldDescription,FieldError,FieldGroup,FieldLabel} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema, type AuthResponse, type LoginForm } from "@/types/AuthTypes"
import { EyeIcon, EyeOffIcon, Loader2, TerminalSquare } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
//import { toast } from 'react-toastify';
import { toast } from 'sonner';
import { login } from "@/api/ReqAuth"
import { useNavigate } from "react-router-dom"
import { ButtonGroup } from "@/components/ui/button-group"
import { useState } from "react"

interface ApiError extends Error {
    status?: number;
}

export default function LoginView() {

    const [see, setSee] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const initialValues : LoginForm = {
        email:"",
        password:""
    }

    const queryClient = useQueryClient();

    const mutation = useMutation<AuthResponse, ApiError, LoginForm>({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem('AUTH_TOKEN', data.bearToken);
            toast.success("Sesion iniciada correctamente", {
                duration: 4000,
            });
            queryClient.invalidateQueries({ queryKey: ["currentUser"],  });
        },
        onError : (error) => {
            const status = error.status;
            setIsLoading(false);

            if (status == 403) {
                toast.warning("Se envio un codigo a tu correo para confirmar tu cuenta",{
                    duration: 4000,
                });
                navigate('/auth/confirm-account', { 
                    state: { email: (mutation.variables && mutation.variables.email) || '' }
                });
                return;
            }

            toast.error(error.message || 'Error al iniciar sesion',{
                description: 'Por favor intenta nuevamente',
                duration: 4000,
            });
        }
    })

    const form = useForm<LoginForm>({resolver: zodResolver(LoginSchema),defaultValues:initialValues})

    const onSubmit = async ( data : LoginForm ) => {
        console.log(data)
        setIsLoading(true);
        await mutation.mutateAsync(data);
        setIsLoading(false);
        navigate('/');
    }

    return (
        <div className=" w-full md:w-1/3 p-6">
            <div className=" w-full flex flex-col items-center gap-2 text-center">
                <div className="flex size-8 items-center justify-center rounded-md">
                    <TerminalSquare size={200} strokeWidth={2.5} className=" size-24"/>
                </div>
                <h1 className="text-xl font-bold">Bienvenido a Pod Terminal</h1>
            </div>
            <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}  >
                <FieldGroup>

                    {/* ========= Email ========= */}
                    <Controller
                        name="email"
                        control={form.control}
                        render={ ({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid} >
                                <FieldLabel htmlFor="form-rhf-input-email">E mail</FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-input-email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="example@example.com"
                                    autoComplete="email"
                                />
                                <FieldDescription>
                                    Ingrese el email con el que se registro
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        ) }
                    
                    />
                    {/* ========= Password ========= */}
                    <Controller
                        name="password"
                        control={form.control}
                        render={ ({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid} >
                                <FieldLabel htmlFor="form-rhf-input-password">Password</FieldLabel>
                                <ButtonGroup>
                                    <Input
                                        {...field}
                                        id="form-rhf-input-password"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="password"
                                        type={!see ? "password" : "text"}
                                    />
                                    <Button type="button" variant={"outline"} className=" cursor-pointer " onClick={() => setSee(!see)}>
                                        {!see ? <EyeIcon/> : <EyeOffIcon/>}
                                    </Button>
                                </ButtonGroup>
                                <FieldDescription>
                                    Ingrese su contraseña
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        ) }
                    />
                    <Field>
                        <Button disabled={isLoading} className=" w-full bg-background text-white border-2 border-primary cursor-pointer" type="submit">
                            {isLoading ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Iniciando Sesión
                            </> : <>Iniciar Sesion</>}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}
