import React from "react";
import InputError from "../InputError/InputError";
import Checkbox from "../Checkbox/Checkbox";

import "./SearchForm.css";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input
          className="search__input"
          id="search-movie"
          name="movie-title"
          placeholder="Фильм"
          required
        >
        </input>
        <InputError formName="search" name="movie" type="input" message="" />
        <button className="search__button"></button>
      </form>
      <Checkbox name="short" checkboxText="Короткометражки" />
    </section>
  );
}
