import { apiOptions } from '../constants';

class MainApi {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    _sendRequest(path, reqOptions) {
        return fetch(`${this._url}/${path}`, { ...reqOptions, credentials: 'include' })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
  }
  
    checkToken() {
        return this._sendRequest(`users/me`, {
            method: 'GET',
            headers: this._headers
        })
    }

    register({ name, email, password }) {
        return this._sendRequest(`signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
    }

    login({ email, password }) {
        return this._sendRequest(`signin`, {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
        })
    }

    logout() {
        return this._sendRequest(`signout`, {})
    }

    updateUserInfo({ name, email }) {
        return this._sendRequest(`users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
            })
        })
    }

    getSavedMovies() {
        return this._sendRequest(`movies`, {
            method: 'GET',
        })
    }

    createSavedMovie(movie) {
        return this._sendRequest(`movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(movie),
        })
    }

    removeSavedMovie(movieId) {
        return this._sendRequest(`movies/${movieId}`, {
            method: 'DELETE',
        })
    }
}

const mainApi = new MainApi(apiOptions);

export default mainApi;