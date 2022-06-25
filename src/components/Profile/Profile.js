import React, { useState,  useContext, useRef, useEffect } from "react";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import InputError from "../InputError/InputError";
import Header from "../Header/Header";
import "./Profile.css";

import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { useValidation } from "../../utils/handleValidation";

export default function Profile({ onEditProfile, onLogout, profileEditResError, isSuccessSubmit }) {
  const [isChanged, setIsChanged] = useState(false);
  const [isDisabled, setisDisabled] = useState(false)
  const user = useContext(CurrentUserContext);
  const [resConfirm, setResConfirm] = useState('');

  const newName = useRef('');
  const newEmail = useRef('');

const {
   errors,
    isValid,
    handleChange,
  } = useValidation({
    name: newName.current.value,
    email: newEmail.current.value,
  });

useEffect(() => {
  if (newName.current.value === user.name && newEmail.current.value === user.email) {
    setIsChanged(false);
  } else {
    setIsChanged(true);
  }
}, [newName.current.value, newEmail.current.value, user.name, user.email])

 const handleSubmit = (event) => {
  event.preventDefault();
  setisDisabled(true);
  if (isValid) {
    const name = newName.current.value;
    const email = newEmail.current.value;
    onEditProfile({ name, email });
console.log({name, email});
    event.target.reset();
    setisDisabled(false);
  }
  setisDisabled(false);
 }

  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__greeting">Привет, {user.name}!</h1>
        <form 
          className="profile__form"
          onSubmit={handleSubmit}
          name="profile-edit"
          noValidate>
            <div className="profile__form-container">
          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="profile-name">
              Имя
            </label>
            <input
            
              className={
                errors.profileName ? 'profile__input profile__input_type_error' : 'profile__input'
              }
              placeholder="Ваше имя"
              type="text"
              id="profile-name"
              name="profile-name"
              minLength="2"
              maxLength="30"
              required
              error={errors.name}
              values={newName.current.value}
              ref={newName}
              onChange={handleChange}
              disabled={isDisabled}
              defaultValue={user.name}
            />
            <InputError 
              isHidden={!errors.name} 
              name="email" 
              type="input" 
              message={errors.name} />
          </fieldset>

          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="profile-email">
              E-mail
            </label>
            <input
              className={
                errors.profileEmail ? 'profile__input profile__input_type_error' : 'profile__input'
              }
              type="email"
              placeholder="Ваш e-mail"
              id="profile-email"
              name="profile-email"
              minLength="2"
              maxLength="30"
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              disabled={isDisabled}
              values={newEmail.current.value}
              onChange={handleChange}
              ref={newEmail}
              defaultValue={user.email}
              error={errors.email}
            />
            <InputError 
            isHidden={!errors.email} 
            name="email" 
            type="input" 
            message={errors.email} />
          </fieldset>
          </div>
          <div className="profile__buttons-container">
            {isChanged ?
              <>
                <InputError
                  isHidden={!resConfirm}
                  name="submit-prifile"
                  type="button"
                  message={resConfirm}
                />
                <ButtonSubmit 
                  text="Сохранить"
                  type="submit"
                  disabled={!isValid || !isChanged}
                   />
              </>
              : 
              <>
                <InputError
                  isHidden={!resConfirm}
                  name="submit-prifile"
                  type="button"
                  message={resConfirm}
                />
                <div className="profile__button-container">
                <button
                  className="profile__button profile__button_type_submit"
                  type="button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setResConfirm('');
                    setIsChanged(true)
                  }}
                >
                  Редактировать
                </button>
                <button
                  className="profile__button profile__button_type_logout"
                  onClick={onLogout}
                  type="reset"
                >
                  Выйти из аккаунта
                </button>
                </div>
              </>
            }
          </div>
        </form>
      </section>
    </>
  );
}
