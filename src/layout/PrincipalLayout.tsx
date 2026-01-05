import { Navigate, Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar/app-sidebar";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types";
import { getCurrentUser } from "@/api/ReqAuth";
import GenericLoadingSkeleton from "@/components/GenericLoadingSkeleton";



export default function PrincipalLayout() {

    const { isLoading, isError} = useQuery<User>({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false, // Recomendado: Si falla la auth (401), no reintentar 3 veces
        refetchOnWindowFocus: false
    })

    if (isError) {
        return <Navigate to="/auth/login" replace />;
    }



    return (
         <SidebarProvider defaultOpen={false} >
            <AppSidebar />
            <SidebarInset>
                <header className="fixed w-full z-50 h-16 shrink-0 flex items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-2 bg-background">
                    <div className=" px-2">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </header>
                <section className="pt-16 transition-[padding] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:pt-12  w-full px-1 md:px-14">
                    { isLoading ? <>
                        <GenericLoadingSkeleton />
                    </> : <Outlet/> }
                </section>
            </SidebarInset>
        </SidebarProvider>
    )
}