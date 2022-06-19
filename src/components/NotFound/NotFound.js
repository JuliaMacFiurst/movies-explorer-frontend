import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <Link className="not-found__link" to="/movies">
        Назад
      </Link>
    </main>
  );
}
