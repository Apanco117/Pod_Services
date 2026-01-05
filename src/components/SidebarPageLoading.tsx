import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarPageLoading() {
    return (
        <div className="flex min-h-screen w-full bg-background">
            {/* 1. Fake Sidebar (Visible solo en md+) */}
            <aside className="hidden md:flex w-64 border-r flex-col p-4 space-y-6">
                {/* Logo Area */}
                <div className="flex items-center gap-2 px-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-5 w-24 rounded-md" />
                </div>

                {/* Navigation Items */}
                <div className="space-y-3 pt-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 px-2">
                            <Skeleton className="h-4 w-4 rounded" />
                            <Skeleton className={`h-4 rounded-md ${i % 2 === 0 ? 'w-24' : 'w-32'}`} />
                        </div>
                    ))}
                </div>

                {/* User Profile Area (Bottom) */}
                <div className="mt-auto flex items-center gap-3 px-2 pt-4 border-t">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-20 rounded" />
                        <Skeleton className="h-3 w-12 rounded" />
                    </div>
                </div>
            </aside>

            {/* 2. Main Content Area (Tu Skeleton Genérico) */}
            <main className="flex-1 overflow-auto">
                <div className="w-full h-full p-6 space-y-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-48 md:w-64 rounded-lg" />
                            <Skeleton className="h-4 w-24 md:w-32 rounded-lg" />
                        </div>
                        <Skeleton className="h-10 w-10 rounded-full md:w-32 md:rounded-md" />
                    </div>

                    {/* Stats/KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Skeleton className="h-28 w-full rounded-xl shadow-sm" />
                        <Skeleton className="h-28 w-full rounded-xl shadow-sm" />
                        <Skeleton className="h-28 w-full rounded-xl shadow-sm" />
                    </div>

                    {/* Content Table/Panel Area */}
                    <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-10 w-1/4 rounded-lg" />
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-8 rounded-md" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                        </div>
                        <Skeleton className="h-100 w-full rounded-xl shadow-sm" />
                    </div>
                </div>
            </main>
        </div>
    );
}