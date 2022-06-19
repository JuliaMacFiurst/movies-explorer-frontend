import React, { useState, useEffect, useContext } from "react";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import InputError from "../InputError/InputError";
import Header from "../Header/Header";
import "./Profile.css";

import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";

export default function Profile() {
  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__greeting">Привет, {user.name}!</h1>
        <form className="profile__form">
            <div className="profile__form-container">
          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="profile-name">
              Имя
            </label>
            <input
              className="profile__input"
              type="text"
              id="profile-name"
              name="profile-name"
              disabled={!isChanged}
              value={name || ""}
              onChange={(evt) => {
                setName(evt.target.value);
              }}
            />
            <InputError isHidden={true} name="email" type="input" message="" />
          </fieldset>

          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="profile-email">
              E-mail
            </label>
            <input
              className="profile__input"
              type="email"
              id="profile-email"
              name="profile-email"
              disabled={!isChanged}
              value={email || ""}
              onChange={(evt) => {
                setEmail(evt.target.value);
              }}
            />
            <InputError isHidden={true} name="email" type="input" message="" />
          </fieldset>
          </div>
          <div className="profile__buttons-container">
            {isChanged ? (
              <>
                <InputError
                  isHidden={true}
                  name="submit-prifile"
                  type="button"
                  message=""
                />
                <ButtonSubmit text="Сохранить" />
              </>
            ) : (
              <>
                <button
                  className="profile__button profile__button_type_submit"
                  type="button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setIsChanged(true);
                  }}
                >
                  Редактировать
                </button>
                <button
                  className="profile__button profile__button_type_logout"
                  type="reset"
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
