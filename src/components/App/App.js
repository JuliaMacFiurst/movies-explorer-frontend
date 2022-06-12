import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Header from "../Header/Header"
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { movies, savedMovies, user } from '../../fixtures';
import { CurrentSavedCardsContext } from '../../context/CurrentSavedCardsContext';
import { CurrentUserContext } from '../../context/CurrentUserContext';

export default function App() {
  return (
    <CurrentUserContext.Provider value={user || {}}>
    <CurrentSavedCardsContext.Provider value={savedMovies || []}>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/movies">
            <Movies movies={movies} />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
      </CurrentSavedCardsContext.Provider>
      </CurrentUserContext.Provider>
  );
}