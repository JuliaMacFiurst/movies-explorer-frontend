import React from "react";

import { NavLink } from "react-router-dom";

import Account from "../Account/Account";

import "./Navigation.css";

export default function Navigation() {
    return (
        <nav className="nav">
            <NavLink to="/movies" 
                className= {({ isActive }) => `nav-link ${isActive && 'nav-link_type_active'}`}>
                    Фильмы
            </NavLink>
            <NavLink to="/saved-movies" 
                className={({ isActive }) => `nav-link ${isActive && 'nav-link_type_active'}`}>
                    Сохраненные фильмы
            </NavLink>
            <Account />
        </nav>
    );
};