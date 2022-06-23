import React from "react";

import "./MoviesCard.css";

export default function MoviesCard(props) {

  const { currentMovie, location, onSaveMovie, onRemoveMovie, isMovieLiked } = props;

    const imageLink = currentMovie?.image?.url ? 'https://api.nomoreparties.co' + currentMovie.image.url : currentMovie.image;
    const thumbnailLink = currentMovie?.image?.formats?.thumbnail?.url ? 'https://api.nomoreparties.co' + currentMovie.image.formats.thumbnail.url : currentMovie.thumbnail;
    const trailerLink = currentMovie.trailerLink || currentMovie.trailer;
    const duration = `${Math.trunc(currentMovie.duration / 60)}ч ${currentMovie.duration % 60}м`;

    const likedCard = isMovieLiked?.(currentMovie);

    function handleMovieCardSave() {
      onSaveMovie({
          movieId: currentMovie.id,
          nameRU: currentMovie.nameRU,
          nameEN: currentMovie.nameEN || 'Неизвестно',
          description: currentMovie.description,
          duration: currentMovie.duration,
          year: currentMovie.year,
          country: currentMovie.country || 'Неизвестно',
          director: currentMovie.director || 'Неизвестно',
          image: imageLink,
          trailer: trailerLink,
          thumbnail: thumbnailLink,
      });
  }

  function toggleMoviesCardLike() {
    if (likedCard) {
        onRemoveMovie(likedCard);

    } else {
        handleMovieCardSave();
    }
}

  return (
    <li className="movies-card">
      <a
        className="movies-card__link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={imageLink}
          alt={`Постер к фильму ${currentMovie.nameRU}`}
        />
      </a>

      <div className="moviea-card__container">
        <h2 className="movies-card__title">{currentMovie.nameRU}</h2>
        <p className="movies-card__duration">{duration}</p>
        {location === "/movies" ? (
          <button
            className={`movies-card__button movies-card__button_type_like ${
              likedCard && "movies-card__button_type_like_active"
            }`}
            onClick={toggleMoviesCardLike}
          />
        ) : (
          <button className="movies-card__button movies-card__button_type_remove"
          onClick={() => onRemoveMovie(currentMovie, true)} 
          />
        )}
      </div>
    </li>
  );
}
