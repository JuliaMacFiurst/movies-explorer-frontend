import React, { useState } from "react";

import { Link } from "react-router-dom";
import InputField from "../InputField/InputField";
import AuthForm from "../AuthForm/AuthForm";
import { useValidation } from "../../utils/useValidation";
import {
  emailValidationMessages,
  passwordValidationMessage,
} from "../../utils/constants";

import "./Register.css";

export default function Register({ onRegister }) {
  const [resFail, setResFail] = useState('');

  const {
    values: { name, email, password },
    errors,
    isFormValid,
    handleChange,
    resetForm,
  } = useValidation(undefined, {
    email: emailValidationMessages,
    password: passwordValidationMessage,
  }
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    resetForm({ name, email, password }, {}, false);

    const result = await onRegister({
      name,
      email,
      password,
    });

    if (result.hasOwnProperty('error')) {
      setResFail(result.error);
    } else {
      resetForm({}, {}, true);
    }
  }
  return (
    <main className="register">
      <AuthForm
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        isValid={isFormValid}
        error={resFail}
      >
        <InputField 
          type="text" 
          formName="register" 
          name="name" 
          title="Имя" 
          required
          value={name || ''}
          error={errors.name}
          setResFail={setResFail}
          onChange={handleChange}
        />
        <InputField
          type="email"
          formName="register"
          name="email"
          title="E-mail"
          required
          value={email || ''}
          error={errors.email}
          setResFail={setResFail}
          onChange={handleChange}
          pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
        />
        <InputField
          type="password"
          formName="register"
          name="password"
          title="Пароль"
          required
          value={password || ''}
          error={errors.password}
          setResFail={setResFail}
          onChange={handleChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}"
        />
      </AuthForm>
      <div className="register__link-question">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin">
          Войти
        </Link>
      </div>
    </main>
  );
}
