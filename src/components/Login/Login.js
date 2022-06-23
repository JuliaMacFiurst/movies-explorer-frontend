import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import InputField from "../InputField/InputField";
import { useValidation } from "../../utils/handleValidation";
import { emailValidationMessages, passwordValidationMessage } from "../../utils/constants";

import "./Login.css";

export default function Login({ onLogin }) {

  const [resFail, setResFail] = useState('');

  const { values: { email, password }, handleChange, errors, isFormValid,  resetForm } = useValidation(
    undefined,
    {
      email: emailValidationMessages,
      password: passwordValidationMessage
    }
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    resetForm({ email, password }, {}, false);

    const result = await onLogin({
      email,
      password
    });

    if (result.hasOwnProperty('error')) {
      setResFail(result.error);
    }
  }
  return (
    <main className="login">
      <AuthForm 
      name="login" 
      title="Рады видеть!" 
      buttonText="Войти"
      isValid={isFormValid}
      error={resFail}
      onSubmit={handleSubmit}
      >
        <InputField 
          type="email" 
          formName="login" 
          name="email" 
          title="E-mail"
          required
          value={email || ''}
          onChange={handleChange}
          error={errors.email}
          setResFail={setResFail}
          pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
          />
        <InputField
          type="password"
          formName="login"
          name="password"
          title="Пароль"
          required
          value={password}
          onChange={handleChange}
          error={errors.password}
          setResFail={setResFail}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,30}"
        />
      </AuthForm>
      <div className="login__link-question">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup"> Регистрация</Link>
      </div>
    </main>
  );
}
