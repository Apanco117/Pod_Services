import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { Loader2, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useMutation } from "@tanstack/react-query";
import type { MessageResponse } from "@/types";
import type { ConfirmAccountForm, ResendTokenForm } from "@/types/AuthTypes";
import { confirmAccount, resendToken } from "@/api/ReqAuth";

export default function ConfirmAccountView() {
    const [token, setToken] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const navigate = useNavigate();
    const location = useLocation();
    
    const email = location.state?.email || '';

    useEffect(() => {
        if (!email) {
            toast.error("Sesión expirada, por favor inicia sesión para confirmar tu cuenta");
            navigate('/auth/login', { replace: true });
        }
    }, [email, navigate]);
    if (!email) return null;

    const mutation = useMutation<MessageResponse, Error, ConfirmAccountForm> ({
        mutationFn: confirmAccount,
        onSuccess: (data) => {
            toast.success( data.message  || "Cuenta confirmada correctamente", {
                duration: 4000,
            });
            navigate('/auth/login', { replace: true });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al confirmar la cuenta',{
                description: 'Por favor intenta nuevamente',
                duration: 4000,
            });
        }
    })

    const mutationResend = useMutation<MessageResponse, Error, ResendTokenForm>({
        mutationFn: resendToken,
        onSuccess: (data) => {
            toast.success( data.message  || "Token reenviado correctamente", {
                duration: 4000,
            });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al reenviar el token',{
                duration: 4000,
            });
            setIsLoading(false);
        }
    })

    const handleComplete = async (value: string) => {
        console.log("Token completo:", value)
        const request : ConfirmAccountForm = {
            token : value
        }
        await mutation.mutateAsync(request)
    }

    const onHandleResend = async () => {
        if (seconds > 0) return;
        setIsLoading(true);
        
        const request : ResendTokenForm = {
            email : email
        }
        await mutationResend.mutateAsync(request)
        setIsLoading(false);
        setSeconds(120);
        
    }

    return (
        <div className=" w-full md:w-1/3 p-6">
            <div className=" w-full flex flex-col items-center gap-2 text-center">
                <div className="flex size-8 items-center justify-center rounded-md">
                    <TerminalSquare size={200} strokeWidth={2.5} className=" size-24"/>
                </div>
                <h1 className="text-xl font-bold">Pod Terminal</h1>
                <FieldDescription className=" text-sm flex items-center space-x-2">
                    <p>Hemos enviado un código de 6 dígitos a <span className="font-bold text-primary">{email}</span> para confirmar tu cuenta</p>
                </FieldDescription>
            </div>
            <div className=" w-full flex justify-center pt-10">
                <InputOTP 
                    maxLength={6}
                    value={token}
                    onChange={(value) => setToken(value)}
                    pattern={REGEXP_ONLY_DIGITS}
                    onComplete={handleComplete}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div className=" w-full flex justify-center pt-5 pb-0">
                <FieldDescription className=" text-sm flex items-center space-x-2">
                    <p>¿No recibiste el código?</p>
                    <Button disabled={ seconds > 0 || isLoading} className=" p-0 cursor-pointer" variant={"link"} onClick={onHandleResend}>
                        {isLoading ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Reenviando codigo
                        </> : seconds > 0 
                        ? `Reenviar código en ${formatTime(seconds)}` 
                        : "Reenviar código"
                        
                    }
                    </Button>
                </FieldDescription>
            </div>
            <div className=" w-full flex justify-center pt-0">
                <FieldDescription className=" text-sm flex items-center space-x-2">
                    <p>¿Ya tienes cuenta?</p>
                    <Button className=" p-0 cursor-pointer" variant={"link"} onClick={ () => navigate("/auth/login") }>
                        Iniciar sesión
                    </Button>
                </FieldDescription>
            </div>
        </div>
    )
}
