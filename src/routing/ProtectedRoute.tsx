import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

/* TODO Impedir el acceso a páginas privadas sin autenticación y Redirigir correctamente al login cuando sea necesario */
export default function ProtectedRoute({children} : {children : React.ReactNode}) {
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}