import isLinkValid from "./api/useLinkValidation";

const getTrailerUrl = (movie) => {
    console.log(movie.trailerLink);
  if (isLinkValid(movie.trailerLink)) {
    
    return movie.trailerLink;
  } else {
    return `https://www.youtube.com`;
  }
};

export default getTrailerUrl;