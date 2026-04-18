export default function DashboardView() {
    // const {data, isLoading, isError} = useQuery<PortfolioItem[]>({
    //     queryKey: ['portfolioItems'],
    //     queryFn : () => getPortfolio(),
    // })

    

    return (
        <div className=" w-full pt-5 pb-10">
            <div className="w-full pt-5 pb-10 px-4 space-y-8">  
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Home</h2>
                        <p className="text-muted-foreground">
                            Bienvenido
                        </p>
                    </div>
                </div>

                <div>
                    {/* <DataTable columns={columns} data={data} /> */}
                </div>
                
            </div>
        </div>
    )
}