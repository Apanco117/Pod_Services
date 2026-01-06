import { getTranding, getTrandingMovers } from "@/api/ReqMarket"
import type { MarketItem } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketList } from "@/components/market/MarketList";

export default function MarketTranding() {

    const {data, isLoading, isError} = useQuery<MarketItem[]>({
        queryKey:["market-tranding"],
        queryFn: () => getTranding()
    })

    const {data : dataMove, isLoading : isLoadingMove, isError : isErrorMove} = useQuery<MarketItem[]>({
        queryKey:["market-move"],
        queryFn: () => getTrandingMovers()
    })

    const error = isError || isErrorMove

    return(
        <div className="w-full max-w-7xl mx-auto p-2 md:p-8 space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Market</h2>
                    <p className="text-muted-foreground">
                        Explora el mercado financiero
                    </p>
                </div>
            </div>
            <div className=" w-full">
                {error ? <></> : <>
                    <div className="md:hidden">
                        <Tabs defaultValue="populares" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="populares">Más Populares</TabsTrigger>
                                <TabsTrigger value="usadas">Más Usadas</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="populares">
                                <MarketList items={data || []} loading={isLoading} />
                            </TabsContent>
                            
                            <TabsContent value="usadas">
                                <MarketList items={dataMove || []} loading={isLoadingMove} />
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="hidden md:grid md:grid-cols-2 gap-8">
                {/* Columna Izquierda */}
                    <div className="space-y-4">
                        <MarketList 
                            title="Más Populares" 
                            items={data || []} 
                            loading={isLoading} 
                        />
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-4">
                        <MarketList 
                            title="Más Usadas" 
                            items={dataMove || []} 
                            loading={isLoadingMove} 
                        />
                    </div>
                </div>


                </>}

            </div>

        </div>
    )
}