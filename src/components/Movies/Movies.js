import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Movies.css"

export default function Movies({ movies }) {
    return(
<>
<Header />
<main className="movies movies-container">
                <SearchForm />
                <MoviesCardList movies={movies} />
                <More isHidden={true} />
            </main>
<Footer />
</>
   )
}