import React, { useContext } from "react";
import "./SavedMovies.css";
import { CurrentSavedCardsContext } from "../../context/CurrentSavedCardsContext";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies() {
  const savedMovies = useContext(CurrentSavedCardsContext);
  return (
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList movies={savedMovies} />
      </section>
  );
}
