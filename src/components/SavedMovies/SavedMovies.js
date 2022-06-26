import React from "react";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SavedMovies({
  movies,
    onSaveMovie,
    onSearchMovie,
    onRemoveMovie,
    keyword,
    onKeywordChange,
    checkboxes,
    onCheckboxChange,
    isValid,
    isNoData
}) {
  
  return (
    <>
      <Header />
      <main className="saved-movies">
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
          onSaveMovie={onSaveMovie}
          onRemoveMovie={onRemoveMovie}
          isNoData={isNoData} 
          />
      </main>
      <Footer />
    </>
  );
}
