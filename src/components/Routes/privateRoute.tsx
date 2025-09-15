import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../../utils/auth";

export default function PrivateRoute() {
    if (!checkAuth()) {
        return <Navigate to="/" />
    }

    return <Outlet />
}