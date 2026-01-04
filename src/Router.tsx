import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import PrincipalLayout from "./layout/PrincipalLayout"
import DashboardView from "./views/DashboardView"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route element={<PrincipalLayout/>}>
                    <Route path="/dashboard" element={<DashboardView/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}