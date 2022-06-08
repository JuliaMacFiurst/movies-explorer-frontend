import React from "react";
import Portfolio from "../Portfolio/Portfolio";
import profileImg from "../../images/profile_pic.jpg";

import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <img className="about-me__img" alt="Фото студента" src={profileImg} />
        <h3 className="about-me__name">Юлия</h3>
        <p className="about-me__career">Художник, учитель живописи, 31 год</p>
        <p className="about-me__description">
          Три года назад переехала в Израиль из Петербурга. Открыла свою
          художественную студию, где рисую сама и учу рисовать детей и взрослых.
          У меня есть муж, дочка, сын и 10 мышей в клетках. В свободное время
          катаюсь на велосипеде, фотографирую, читаю и кодю.
        </p>
        <div className="about-me__social-links">
          <a
            className="about-me-link"
            href="https://www.facebook.com/juliamahlina/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            className="about-me-link"
            href="https://github.com/JuliaMacFiurst"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <Portfolio />
    </section>
  );
}
