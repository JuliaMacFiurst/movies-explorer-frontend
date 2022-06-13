import React, { useContext } from "react";
import "./SavedMovies.css";
import { CurrentSavedCardsContext } from "../../context/CurrentSavedCardsContext";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  const savedMovies = useContext(CurrentSavedCardsContext);
  
  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList movies={savedMovies} />
      </main>
      <Footer />
    </>
  );
}
