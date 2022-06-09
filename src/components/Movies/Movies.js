import React from "react";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

import "./Movies.css"

export default function Movies() {
    return(
<div className="movies-container">

<main className="movies">
                <SearchForm />
                {/* <MoviesCardList movies={movies} />
                <More isVisible={true} /> */}
            </main>
            <Footer />
</div>
   )
}