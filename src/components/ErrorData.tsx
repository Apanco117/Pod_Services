import { RefreshCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { IconError404 } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query";

export default function ErrorData(){
    const queryClient = useQueryClient();
    const handleClick = () => {
        queryClient.invalidateQueries();
    }

    return(
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconError404/>
                </EmptyMedia>
                <EmptyTitle>Error al recuperar la informacion</EmptyTitle>
                <EmptyDescription>
                    Parece que hubo un error al traer la informacion, intente recargar la pagina
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" size="sm" onClick={handleClick}>
                    <RefreshCcwIcon />
                    Refresh
                </Button>
            </EmptyContent>
        </Empty>
    )
}