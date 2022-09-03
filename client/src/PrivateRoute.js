import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Context } from "./Context";

export default (props)=>{
    const { authUser } = useContext(Context);
    const location = useLocation();
    return authUser? <Outlet /> : <Navigate to="/login" replace state={{from: location}} />;
}