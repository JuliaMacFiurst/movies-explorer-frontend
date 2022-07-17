import React from "react";
import InputError from "../InputError/InputError";
import Checkbox from "../Checkbox/Checkbox";
import { validationMessages } from "../../utils/constants";

import "./SearchForm.css";

export default function SearchForm({
  onSearchMovie,
    keyword,
    onKeywordChange,
    checkboxes,
    onCheckboxChange,
    isValid 
}) {
  
  const onSearchButtonClick = (event) => {
    event.preventDefault()
    onSearchMovie();
}

const onFilterCheckboxClick = (nextCheckboxValue, checkboxName) => {
    onCheckboxChange({ ...checkboxes, [checkboxName]: nextCheckboxValue });
}

  return (
    <section className="search">
      <form className="search__form">
        <input
          className="search__input"
          id="search-movie"
          name="keyword"
          placeholder="Фильм"
          required
          minLength="1"
          maxLength="100"
          value={keyword || ''}
          onChange={onKeywordChange}
        >
        </input>
        <InputError 
        formName="search" 
        name="movie" 
        type="input" 
        isHidden={isValid}
        message={validationMessages.valueRequired()}
         />
        <button 
        className="search__button"
        onClick={onSearchButtonClick}
        ></button>
      </form>
      <Checkbox 
      name="shortMovies" 
      checkboxText="Короткометражки"
      value={checkboxes["shortMovies-checkbox"]}
      onChange={onFilterCheckboxClick} 
      />
    </section>
  );
}
