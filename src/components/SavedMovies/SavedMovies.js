import React, { useContext } from "react";
import "./SavedMovies.css";
import { CurrentSavedCardsContext } from "../../context/CurrentSavedCardsContext";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  const savedMovies = useContext(CurrentSavedCardsContext);
  return (
    <>
      <section className="saved_movies">
        <SearchForm />
        <MoviesCardList movies={savedMovies} />
      </section>
      <Footer />
    </>
  );
}
