import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__copyright-year"> 2022</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://praktikum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="http://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
