import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import More from "../More/More";
import { screenParams } from "../../utils/constants";
import handleScreenWidth from "../../utils/handleScreenWidth";

import "./MoviesCardList.css";

export default function MoviesCardList({
  movies,
  onSaveMovie,
  onRemoveMovie,
  isMovieLiked,
  isDataLoading,
  isNoData,
}) {
  const { desktop, tablet, mobile } = screenParams;
  const [counter, setCounter] = useState(movies.length);
  const screenWidth = handleScreenWidth();
  const { pathname } = useLocation();

  const isShowAllMovies = pathname === "/saved-movies";

  const currentScreenParams = useMemo(() => {
    if (screenWidth >= desktop.width) {
      return desktop.params;
    } else if (screenWidth >= tablet.width && screenWidth < desktop.width) {
      return tablet.params;
    } else {
      return mobile.params;
    }
  }, [screenWidth]);

  useEffect(() => {
    setCounter(currentScreenParams.initial);
  }, [movies, currentScreenParams]);

  function moreButtonClick() {
    setCounter((prevCounter) => prevCounter + currentScreenParams.more);
  }

  return (
    <>
      <ul className="movies-card__list">
        {isDataLoading || (isDataLoading && !isNoData.status) ? (
          <Preloader />
        ) : isNoData.status ? (
          <p className="movies-card-list__no-data">{isNoData.message}</p>
        ) : (
          movies
            .slice(0, isShowAllMovies ? undefined : counter)
            .map((movie, index) => {
              return (
                <MoviesCard
                  key={`${index}_${movie.nameEN}`}
                  currentMovie={movie}
                  location={pathname}
                  onSaveMovie={onSaveMovie}
                  onRemoveMovie={onRemoveMovie}
                  isMovieLiked={isMovieLiked}
                />
              );
            })
        )}
      </ul>
      {!isDataLoading && !isShowAllMovies && counter < movies.length && (
        <More onClick={moreButtonClick} />
      )}
    </>
  );
}
