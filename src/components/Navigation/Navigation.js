import React from "react";

import { NavLink } from "react-router-dom";

import Account from "../Account/Account";

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
            <Account />
        </nav>
    );
};