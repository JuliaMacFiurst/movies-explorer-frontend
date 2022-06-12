import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";

import "./Movies.css"

export default function Movies({ movies }) {
    return(
<div className="movies-container">

<main className="movies">
                <SearchForm />
                <MoviesCardList movies={movies} />
                <More isHidden={true} />
            </main>
</div>
   )
}