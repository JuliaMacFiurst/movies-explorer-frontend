import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import MoviesPages from "../MoviesPages/MoviesPages";
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

  const [registerResError, setRegisterResError] = useState('');
  const [loginResError, setLoginResError] = useState('');
  const [profileEditResError, setProfileEditResError] = useState('');
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function checkUserAccess() {
    let user;

    try {
      user = await mainApi.checkToken();

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
      navigate("/movies");
    }
  }

  useEffect(() => {
    checkUserAccess();
  }, []);

  async function handleRegistration(userData) {
    setRegisterResError('');
    let user;

    try {
      user = await mainApi.register(userData);
    } catch (err) {
      if (err.status === 409) {
       setRegisterResError("Такой пользователь уже существует");
      } else if (err.status === 500) {
        setRegisterResError("Ошибка сервера. Повторите попытку позже");
      } else {
       setRegisterResError("При регистрации произошла ошибка");
      }
      return (err.message);
    }

    handleLogin(userData);

    return user;
  }

  async function handleLogin(userData) {
    setLoginResError('');
    let isLoggedIn;

    try {
      isLoggedIn = await mainApi.login(userData);
      checkUserAccess();
    } catch (err) {
      if (err.status === 401) {
        setLoginResError("Неправильный логин или пароль.");
      } else {
        setLoginResError("Ошибка сервера. Повторите попытку позже");
      }
      return (err.message);
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
    navigate("/");
    localStorage.clear();
      }
      
      return console.log("Ошибка сервера. Повторите попытку позже");
    }

    setCurrentUser(false);
    setLoggedIn(null);
    Navigate("/");
    localStorage.clear();
  }

  async function handleEditProfile(userInfo) {
    setProfileEditResError('');
    setIsSuccessSubmit(false);
    let updatedUserInfo;

    try {
      updatedUserInfo = await mainApi.editUserInfo(userInfo);
    } catch (err) {
      if (err.status === 409) {
        setProfileEditResError("Пользователь с таким email уже существует.");
      } else if (err.status === 500) {
        setProfileEditResError("Ошибка сервера. Повторите попытку позже");
      } else {
        setProfileEditResError("При обновлении профиля произошла ошибка.");
      }

      return (err.message);
    }

    setCurrentUser(updatedUserInfo);
    setIsSuccessSubmit(true);
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
              <Register onRegister={handleRegistration} registerResError={registerResError} />}
            />
            <Route path="/signin" element={loggedIn ?
              <Navigate replace to="/movies" />
              :
              <Login onLogin={handleLogin} loginResError={loginResError}/>} />
            <Route element={<ProtectedRoute loggedIn={loggedIn} />} >
              <Route path="/movies" element={<MoviesPages />} />
              <Route path="/saved-movies" element={<MoviesPages />} />
              <Route path="/profile" element={<Profile 
              onLogout={handleLogout} 
              onEditProfile={handleEditProfile} 
              profileEditResError={profileEditResError}
              isSuccessSubmit={isSuccessSubmit}
               />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        }

      </div >
    </CurrentUserContext.Provider>
  );
}
