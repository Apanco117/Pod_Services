import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrincipalLayout from "./layout/PrincipalLayout"
import DashboardView from "./views/DashboardView"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrincipalLayout/>}>
                    <Route path="/dashboard" element={<DashboardView/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}