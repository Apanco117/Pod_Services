import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PrincipalLayout from "./layout/PrincipalLayout"
import DashboardView from "./views/DashboardView"
import AuthLayout from "./layout/AuthLayout"
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import ConfirmAccountView from "./views/ConfirmAccountView"
import AdminUsersView from "./views/AdminUsersView"
import { AxiosInterceptor } from "./components/AxiosInterceptor"
import MarketTranding from "./views/MarketTrandingView"
import AdminStocksView from "./views/AdminStocksView"
import StockView from "./views/StockView"

export default function Router() {
    return (
        <BrowserRouter>
            <AxiosInterceptor>
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/auth/login" element={<LoginView/>} />
                        <Route path="/auth/register" element={<RegisterView/>} />
                        <Route path="/auth/confirm-account" element={<ConfirmAccountView/>} />
                    </Route>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route element={<PrincipalLayout/>}>
                        <Route path="/dashboard" element={<DashboardView/>} />
                        <Route path="/admin/users" element={<AdminUsersView/>} />
                        <Route path="/admin/stocks" element={<AdminStocksView/>} />
                        <Route path="/market/tranding" element={<MarketTranding/>} />
                        <Route path="/stock/:ticker" element ={<StockView/>}/>
                    </Route>
                </Routes>
            </AxiosInterceptor>
        </BrowserRouter>
    )
}