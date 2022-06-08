import React from "react";

import arrowPointer from "../../images/main_page_arrow.svg";

import "./Portfolio.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/JuliaMacFiurst/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <img
              className="portfolio__arrow"
              src={arrowPointer}
              alt="стрелка-указатель"
            ></img>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://juliamacfiurst.github.io/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <img
              className="portfolio__arrow"
              src={arrowPointer}
              alt="стрелка-указатель"
            ></img>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://mesto.juliamakhlin.nomoredomains.xyz"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <img
              className="portfolio__arrow"
              src={arrowPointer}
              alt="стрелка-указатель"
            ></img>
          </a>
        </li>
      </ul>
    </div>
  );
}
