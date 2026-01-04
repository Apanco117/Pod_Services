import { useNavigate } from "react-router-dom"

export default function Index() {

    const navigate = useNavigate();
    navigate("/dashboard");
    return (
        <div className=" w-full flex justify-center p-6">
            <p>Redirigiendo...</p>
        </div>
    )
}
