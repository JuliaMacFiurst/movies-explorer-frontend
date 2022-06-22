import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
// import { movies, savedMovies, user } from '../../fixtures';
// import { CurrentSavedCardsContext } from "../../context/CurrentSavedCardsContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../utils/api/MainApi";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


export default function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  const Navigate = useNavigate();
  const { pathname } = useLocation();

  async function checkUserAccess() {
    let user;

    try {
      user = mainApi.checkToken();

      if (!user) {
        throw new Error("Ошибка авторизации. Передан некорректный токен.");
      }
    } catch (err) {
      setLoggedIn(false);
      return console.log(
        "Ошибка авторизации. Токен не передан или передан не в том формате."
      );
    }

    setCurrentUser(user);
    setLoggedIn(true);

    if (pathname === ("/signin" || "/signup")) {
      Navigate("/movies");
    }
  }

  useEffect(() => {
    checkUserAccess();
  }, []);

  async function handleRegistration(userData) {
    let user;

    try {
      user = await mainApi.register(userData);
    } catch (err) {
      let message;

      if (err.status === 409) {
        message = "Такой пользователь уже существует";
      } else if (err.status === 500) {
        message = "Ошибка сервера. Повторите попытку позже";
      } else {
        message = "При регстрации полизошла ошибка";
      }
      return { err: message };
    }

    handleLogin(userData);

    return user;
  }

  async function handleLogin(userData) {
    let isLoggedIn;

    try {
      isLoggedIn = await mainApi.login(userData);
      checkUserAccess();
    } catch (err) {
      let message;

      if (err.status === 401) {
        message = "Неправильный логин или пароль.";
      } else {
        message = "Ошибка сервера. Повторите попытку позже";
      }
      return { err: message };
    }

    return { message: isLoggedIn.message };
  }

  async function handleLogout() {
    localStorage.removeItem("jwt");

    try {

      await mainApi.logout();
    } catch (err) {
      if (err.status === 401) {
        setCurrentUser(false);
    setLoggedIn(null);
    Navigate("/");
    localStorage.clear();
      }
      console.log(err);
      return console.log("Ошибка сервера. Повторите попытку позже");
    }

    setCurrentUser(false);
    setLoggedIn(null);
    Navigate("/");
    localStorage.clear();
  }

  async function handleEditProfile(userInfo) {
    let updatedUserInfo;

    try {
      updatedUserInfo = await mainApi.updatedUserInfo(userInfo);
    } catch (err) {
      let message;

      if (err.status === 409) {
        message = "Пользователь с таким email уже существует.";
      } else if (err.status === 500) {
        message = "Ошибка сервера. Повторите попытку позже";
      } else {
        message = "При обновлении профиля произошла ошибка.";
      }

      return { err: message };
    }

    setCurrentUser(updatedUserInfo);
    return updatedUserInfo;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {loggedIn === undefined ?
          <div className="app__preloader">
            <Preloader />
          </div>
          :
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route path="/signup" element={loggedIn ?
              <Navigate replace to="/movies" />
              :
              <Register onRegister={handleRegistration} />}
            />
            <Route path="/signin" element={loggedIn ?
              <Navigate replace to="/movies" />
              :
              <Login onLogin={handleLogin} />} />
            <Route element={<ProtectedRoute loggedIn={loggedIn} />} >
              <Route path="/movies" element={<Movies />} />
              <Route path="/saved-movies" element={<SavedMovies />} />
              <Route path="/profile" element={<Profile onLogout={handleLogout} onEditProfile={handleEditProfile} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        }

      </div >
    </CurrentUserContext.Provider>
  );
}
