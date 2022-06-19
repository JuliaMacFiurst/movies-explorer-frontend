import React from "react";

import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project" id="project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <div className="about-project__main_container">
          <div className="about-project__main">
            <h3 className="about-project__main-header">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__main-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__main">
            <h3 className="about-project__main-header">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__main-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
      </div>
      <div className="about-project__timeline_container">
        <div className="about-project__timeline">
          <p className="about-project__timeline-duration">1 неделя</p>
          <p className="about-project__timeline-duration">4 недели</p>
          <p className="about-project__timeline-name">Back-end</p>
          <p className="about-project__timeline-name">Front-end</p>
        </div>
      </div>
    </section>
  );
}
