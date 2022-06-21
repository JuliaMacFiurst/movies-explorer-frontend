import React, { useState, useEffect, useContext } from "react";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import InputError from "../InputError/InputError";
import Header from "../Header/Header";
import "./Profile.css";

import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { useValidation } from "../../utils/useValidation";
import { emailValidationMessages, successMessage } from "../../utils/constants";



export default function Profile({ onEditProfile, onLogout }) {
  const [isChanged, setIsChanged] = useState(false);
  const user = useContext(CurrentUserContext);
  const [resConfirm, setResConfirm] = useState('');

const {values: { name, email }, handleChange, errors, isFormValid, resetForm } = useValidation({
  values: {
    name: user.name,
    email: user.email
}
},
{ email: emailValidationMessages, }
);

 async function onSubmit(evt) {
  evt.preventDefault();
  resetForm({ name, email }, {}, false);

  const result = await onEditProfile({
    name,
    email,
  });
  if (result.hasOwnProperty('error')) {
    setResConfirm(result.error);
  } else {
    setResConfirm(successMessage.successEditProfile);
  }
  setIsChanged(result.hasOwnProperty('error'))
 };

  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__greeting">Привет, {user.name}!</h1>
        <form 
          className="profile__form"
          onSubmit={onSubmit}>
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
              minLength="2"
              maxLength="30"
              disabled={!isChanged}
              required
              value={name ||''}
              onChange={(evt) => {
                setResConfirm('');
                handleChange(evt.target);
              }
            }
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
              className="profile__input"
              type="email"
              id="profile-email"
              name="profile-email"
              minLength="2"
              maxLength="30"
              required
              pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
              disabled={!isChanged}
              value={email || ''}
              onChange={(evt) => {
                setResConfirm('');
                handleChange(evt.target);
              }
            }
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
                  disabled={!isFormValid || (name === user.name && email === user.email)}
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
                  type="reset"
                >
                  Выйти из аккаунта
                </button>
              </>
            }
          </div>
        </form>
      </section>
    </>
  );
}
