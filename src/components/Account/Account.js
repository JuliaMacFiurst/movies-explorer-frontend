import React from "react";
import { Link } from "react-router-dom";

import "./Account.css"

export default function Account() {
    return (
        <>
            <Link to="/profile"
                className="account-link">
                <div className="account-link__icon"></div>
                Аккаунт
            </Link>
        </>
    );
};