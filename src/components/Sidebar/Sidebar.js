import React from "react";
import { NavLink } from "react-router-dom";

import Account from "../Account/Account";

import "./Sidebar.css";

export default function Sidebar({ isOpened, onClose }) {
  return (
    <div
      className={
        isOpened
          ? "sidebar-wrapper sidebar-wrapper_type_opened"
          : "sidebar-wrapper"
      }
    >
      <nav className={isOpened ? "sidebar sidebar_type_opened" : "sidebar"}>
        <button
          className="sidebar__close-button"
          type="button"
          onClick={onClose}
        />

        <ul className="sidebar-list">
          <li className="sidebar-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `sidebar-link ${isActive && "sidebar-link_type_active"}`
              }
            >
              Главная
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `sidebar-link ${isActive && "sidebar-link_type_active"}`
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `sidebar-link ${isActive && "sidebar-link_type_active"}`
              }
            >
              Сохраненные фильмы
            </NavLink>
          </li>
          <li className="sidebar-item__account">
            <Account />
          </li>
        </ul>
      </nav>
    </div>
  );
}
