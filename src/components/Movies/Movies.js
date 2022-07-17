import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Movies.css";

export default function Movies({
  movies,
  onSearchMovie,
  onSaveMovie,
  onRemoveMovie,
  keyword,
  onKeywordChange,
  checkboxes,
  onCheckboxChange,
  isValid,
  isLikedMovie,
  isDataLoading,
  isNoData,
}) {
  return (
    <>
      <Header />
      <main className="movies movies-container">
        <SearchForm
          onSearchMovie={onSearchMovie}
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          checkboxes={checkboxes}
          onCheckboxChange={onCheckboxChange}
          isValid={isValid}
        />  
        <MoviesCardList
          movies={movies}
          isLikedMovie={isLikedMovie}
          onSaveMovie={onSaveMovie}
          onRemoveMovie={onRemoveMovie}
          isDataLoading={isDataLoading}
          isNoData={isNoData}
        />
      </main>
      <Footer />
    </>
  );
}
