import React from "react";

import { NavLink, Link } from "react-router-dom";

import "./Navigation.css";

export default function Navigation() {
    return (
        <nav className="nav">
            <NavLink exact to="/movies" 
                className= "nav-link"
                activeClassName="nav-link_type_active">
                    Фильмы
            </NavLink>
            <NavLink to="/saved-movies" 
                className="nav-link"
                activeClassName="nav-link_type_active">
                    Сохраненные фильмы
            </NavLink>
            <>
            <Link to="/profile"
                className="nav-link nav-link_type_account">
                <div className="nav-link__icon"></div>
                Аккаунт
            </Link>
            </>
        </nav>
    );
}