import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Default = () => {
    return (
    <Navigate to="/home/inicio" replace={true} />
    )
};
