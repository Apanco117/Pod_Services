import {
    Frame,
    Map,
    PieChart,
    User,
    LayoutDashboard
} from "lucide-react"

export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
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
            title: "Usuarios",
            url: "/usuarios",
            icon: User,
            items: [
                {
                    title: "Administrar usuarios",
                    url: "/usuarios",
                }
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}