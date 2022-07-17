import { moviesApiUrl } from "../constants";

class MoviesApi {
  constructor(options) {
    this._url = options.url;
  }

  async getMovies() {
    let promise;

    try {
      promise = await fetch(this._url);

      if (promise.ok) {
        return promise.json();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const moviesApi = new MoviesApi({ url: moviesApiUrl });

export default moviesApi;
