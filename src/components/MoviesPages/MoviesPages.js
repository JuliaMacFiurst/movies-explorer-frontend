import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import mainApi from "../../utils/api/MainApi";
import moviesApi from "../../utils/api/MoviesApi";
import { useValidation } from "../../utils/handleValidation";

import { errorMessages, shortMovieDuration } from "../../utils/constants";
import {
  defaultCheckboxValue,
  getLocalStorageData,
} from "../../utils/localStorageData";

export default function MoviesPages() {
  const { pathname } = useLocation();

  const [allMovies, setAllMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState(
    pathname === "/movies" ? getLocalStorageData("foundMovies", null) : null
  );

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [checkboxes, setCheckboxes] = useState(
    pathname === "/movies"
      ? getLocalStorageData("checkboxes", defaultCheckboxValue)
      : defaultCheckboxValue
  );

  const [isDataLoading, setIsDataloading] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const {
    values: { keyword },
    handleChange: handleKeywordChange,
    isValid,
    resetForm,
  } = useValidation({
    values: {
      keyword: pathname === "/movies" ? getLocalStorageData("keyword", "") : "",
    },
    isValid: true,
  });

  const savedMoviesSetRef = useRef(false);

  async function getAllMovies() {
    let movies;

    try {
      movies = await moviesApi.getMovies();
    } catch (error) {
      console.log(errorMessages.serverError);
    }

    setAllMovies(movies);
    return movies;
  }

  async function getSavedMovies() {
    let movies;

    try {
      movies = await mainApi.getSavedMovies();
    } catch (error) {
      return console.log(errorMessages.serverError);
    }

    if (movies.length === 0) {
      setSavedMovies(null);
    } else {
      setSavedMovies(movies);
    }
  }

  const setIsNoData = useCallback(() => {
    if (selectedMovies === null) {
      return { status: false, message: "" };
    }

    if (selectedMovies.length === 0) {
      return { status: true, message: errorMessages.didntFindMovies };
    }

    if (filteredMovies.length === 0 && checkboxes["shortMovies-checkbox"]) {
      return { status: true, message: errorMessages.didntFindMovies };
    }

    return { status: false, message: "" };
  }, [selectedMovies, filteredMovies, checkboxes]);

  const isNoData = setIsNoData();
  const isLikedMovie = useCallback(
    (movie) =>
      savedMovies
        ? savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
        : false,
    [savedMovies]
  );

  useEffect(() => {
    if (pathname === "/movies") {
      localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
    }
  }, [checkboxes]);

  useEffect(() => {
    getSavedMovies();
  }, []);

  useEffect(() => {
    if (pathname === "/movies") {
      const localStorageMovies = getLocalStorageData("foundMovies", null);
      const localStorageCheckbox = getLocalStorageData(
        "checkboxes",
        defaultCheckboxValue
      );
      const localStorageKeyword = getLocalStorageData("keyword", "");

      setSelectedMovies(localStorageMovies);
      setCheckboxes(localStorageCheckbox);
      savedMoviesSetRef.current = false;
      resetForm(
        {
          keyword: localStorageKeyword,
        },
        {},
        true
      );
    } else {
      resetForm({}, {}, true);
      setCheckboxes(defaultCheckboxValue);
      setSelectedMovies(savedMovies);
    }
  }, [pathname]);

  useEffect(() => {
    if (
      pathname !== "/saved-movies" ||
      savedMovies === null ||
      savedMoviesSetRef.current === true
    ) {
      return undefined;
    }
    setSelectedMovies(savedMovies);
    savedMoviesSetRef.current = true;
  }, [pathname, savedMovies]);

  async function handleSearchMovies() {
    if (!keyword) {
      return undefined;
    }

    setIsDataloading(true);

    let searchedMovies;

    if (pathname === "/movies") {
      if (!allMovies) {
        searchedMovies = await getAllMovies();
      } else {
        searchedMovies = allMovies;
      }
    } else {
      if (!savedMovies) {
        searchedMovies = [];
      } else {
        searchedMovies = savedMovies;
      }
    }
    const foundMovies = searchedMovies.filter((movie) =>
      movie.nameRU.includes(keyword.toLowerCase())
    );

    setSelectedMovies(foundMovies);
    setIsDataloading(false);

    if (pathname === "/movies") {
      localStorage.setItem("keyword", keyword);
      localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
    }
  }
  const foundMoviesWithCheckbox = useMemo(() => {
    if (selectedMovies === null) {
      return undefined;
    }

    if (!checkboxes["shortMovies-checkbox"]) {
      return selectedMovies;
    }

    const filteredMovies = selectedMovies.filter(
      (movie) => movie.duration <= shortMovieDuration
    );
    setFilteredMovies(filteredMovies);

    return filteredMovies;
  }, [selectedMovies, checkboxes]);

  async function handleSaveMovie(movie) {
    let savedMovie;

    try {
      savedMovie = await mainApi.createSavedMovie(movie);

      setSavedMovies((savedMovies) => {
        if (!savedMovies) {
          return [savedMovie];
        }

        return [...savedMovies, savedMovie];
      });
    } catch (error) {
      setIsInfoTooltipOpen(true);
      return console.log(errorMessages.serverError);
    }

    return savedMovie;
  }

  async function handleRemoveMovie(movie, withRemoveFromSelected) {
    try {
      await mainApi.removeSavedMovie(movie._id);
      setSavedMovies((savedMovies) =>
        savedMovies.filter((savedMovie) => savedMovie._id !== movie._id)
      );

      if (withRemoveFromSelected) {
        setSelectedMovies((selectedMovies) =>
          selectedMovies.filter(
            (selectedMovie) => selectedMovie._id !== movie._id
          )
        );
      }
    } catch (error) {
      setIsInfoTooltipOpen(true);
      return console.log(errorMessages.serverError);
    }
  }

  if (pathname === "/movies") {
    return (
      <>
        <Movies
          movies={foundMoviesWithCheckbox || []}
          onSearchMovie={handleSearchMovies}
          onSaveMovie={handleSaveMovie}
          onRemoveMovie={handleRemoveMovie}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          checkboxes={checkboxes}
          onCheckboxChange={setCheckboxes}
          isValid={isValid}
          isLikedMovie={isLikedMovie}
          isDataLoading={isDataLoading}
          isNoData={isNoData}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={() => setIsInfoTooltipOpen(false)}
          message={errorMessages.saveMovieError}
        />
      </>
    );
  }

  return (
    <>
      <SavedMovies
        initialMovies={savedMovies}
        movies={foundMoviesWithCheckbox || []}
        setMovies={setSelectedMovies}
        onSearchMovie={handleSearchMovies}
        onRemoveMovie={handleRemoveMovie}
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        checkboxes={checkboxes}
        onCheckboxChange={setCheckboxes}
        isValid={isValid}
        isDataLoading={isDataLoading}
        isNoData={isNoData}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        message={errorMessages.removeMovieError}
      />
    </>
  );
}
