import { ChartBar, LayoutDashboard, Settings2, User } from "lucide-react";

export const getNavData = (userRole: string) => {
    console.log("User Role:", userRole);
    const navMain = [
        {
            title: "Main",
            url: "/",
            icon: LayoutDashboard,
            isActive: true,
            
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                },
                {
                    title: "Transacciones",
                    url: "/transacciones",
                }
            ],
        },
        {
            title: "Market",
            url: "/market",
            icon: ChartBar,
            isActive: true,
            items: [
                {
                    title: "Market Tranding",
                    url: "/market/tranding",
                }
            ],
        },
        {
            title: "Configuración",
            url: "/usuarios",
            icon: Settings2,
            roles: ['ADMIN'],
            items: [
                {
                    title: "Usuarios y Accesos",
                    url: "/admin/users",        
                    icon: User,
                },
            ],
        },
    ];

    return navMain.filter(item => {
        if (!item.roles) return true;
        return item.roles.includes(userRole);
    });
}