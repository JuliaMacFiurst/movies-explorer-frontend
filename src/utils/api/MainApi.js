import { mainApiUrl } from '../constants';

class MainApi {
    constructor(options) {
      this._url = options.baseUrl;
    }
  
    async _sendRequest(path, reqOptions) {
        try {
            const response = await fetch(`${this._url}/${path}`, { ...reqOptions, credentials: 'include' });
            if (!response.ok) {
                throw response;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
  
    checkToken() {
        // console.log(`читаем токен ${localStorage.getItem("jwt")}`)
        return this._sendRequest(`users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
            }
        })
    }

    register({ name, email, password }) {
        return this._sendRequest(`signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
              },
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
                },
                body: JSON.stringify({
                    email,
                    password,
                })
        })
        .then((data) => {
            if (data.token) {
                      localStorage.setItem('jwt', data.token)
                      return data.token
                      
            }
        })
    }


    logout() {
        return this._sendRequest(`signout`, {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
                },
                body: JSON.stringify ({messege: "logout"})
        })
    }

    editUserInfo({ name, email }) {
        return this._sendRequest(`users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
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
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
    }

    createSavedMovie(movie) {
        return this._sendRequest(`movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(movie),
        })
    }

    removeSavedMovie(movieId) {
        return this._sendRequest(`movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
    }
}

const mainApi = new MainApi({ baseUrl: mainApiUrl });

export default mainApi;