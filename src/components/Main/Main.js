import React from "react";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

import "./Main.css";

export default function Main() {
  const isAuthorized = false;

  return (
    <div className="main__container">
      {isAuthorized ? (
        <Header />
      ) : (
        <header className="main__auth-header">
          <Logo />
          <ul className="main__auth-list">
            <li className="main__auth-item">
              <NavLink
                to="/signup"
                className="main__auth-link main__auth-link_type_register"
              >
                Регистрация
              </NavLink>
            </li>
            <li className="main__auth-item">
              <NavLink
                to="/signin"
                className="main__auth-link main__auth-link_type_login"
              >
                Войти
              </NavLink>
            </li>
          </ul>
        </header>
      )}

      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
    </div>
  );
}
