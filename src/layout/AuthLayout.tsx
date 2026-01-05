import { Outlet } from "react-router-dom";
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';

export default function AuthLayout() {
     
    return (
        <StarsBackground
            starColor={'#FFF'}            
            className="absolute inset-0 flex items-center justify-center"
        >
            <Outlet/>
        </StarsBackground>
    )
}