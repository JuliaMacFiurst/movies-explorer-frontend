import React from "react";
import { Link } from "react-router-dom";

import AuthForm from "../AuthForm/AuthForm";
import InputField from "../InputField/InputField";

import "./Login.css";

export default function Login() {
  return (
    <main className="login">
      <AuthForm name="login" title="Рады видеть!" buttonText="Войти">
        <InputField 
          type="email" 
          formName="login" 
          name="email" 
          title="E-mail" />
        <InputField
          type="password"
          formName="login"
          name="password"
          title="Пароль"
        />
      </AuthForm>
      <div className="login__link-question">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup"> Регистрация</Link>
      </div>
    </main>
  );
}
