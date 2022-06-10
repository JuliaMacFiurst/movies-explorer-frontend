import React from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import "./Movies.css"

export default function Movies({ movies }) {
    return(
<div className="movies-container">

<main className="movies">
                <SearchForm />
                <MoviesCardList movies={movies} />
                {/* <More isVisible={true} /> */}
            </main>
            <Footer />
</div>
   )
}