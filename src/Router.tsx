import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PrincipalLayout from "./layout/PrincipalLayout"
import DashboardView from "./views/DashboardView"
import AuthLayout from "./layout/AuthLayout"
import LoginView from "./views/LoginView"
import AdminUsersView from "./views/AdminUsersView"
import { AxiosInterceptor } from "./components/AxiosInterceptor"
import AdminStocksView from "./views/AdminStocksView"
import StockView from "./views/StockView"
import MonitorEvents from "./views/MonitorEvents"
import MonitorLiveView from "./views/MonitorLiveView"
import EquiposView from "./views/EquiposView"
import NodosSitView from "./views/NodosSitView"

export default function Router() {
    return (
        <BrowserRouter>
            <AxiosInterceptor>
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/auth/login" element={<LoginView/>} />
                    </Route>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route element={<PrincipalLayout/>}>
                        <Route path="/dashboard" element={<DashboardView/>} />
                        <Route path="/admin/users" element={<AdminUsersView/>} />
                        <Route path="/admin/stocks" element={<AdminStocksView/>} />
                        <Route path="/monitor/events" element={<MonitorEvents/>} />
                        <Route path="/monitor/live" element={<MonitorLiveView/>} />
                        <Route path="/sit/nodos" element={<NodosSitView/>} />
                        <Route path="/admin/equipos" element={<EquiposView/>} />
                        <Route path="/stock/:ticker" element ={<StockView/>}/>
                    </Route>
                </Routes>
            </AxiosInterceptor>
        </BrowserRouter>
    )
}