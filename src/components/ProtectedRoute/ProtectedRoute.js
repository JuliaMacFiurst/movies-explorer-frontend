import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ loggedIn }) {

    if (!loggedIn) {
        return <Navigate to="/" />
    }

    return (
        <Outlet />

    );
}