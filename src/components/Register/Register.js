import React from "react";

import { Link } from "react-router-dom";
import InputField from "../InputField/InputField";
import AuthForm from "../AuthForm/AuthForm";

import "./Register.css";

export default function Register() {
  return (
    <main className="register">
      <AuthForm
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
      >
        <InputField 
          type="text" 
          formName="register" 
          name="name" 
          title="Имя" 
        />
        <InputField
          type="email"
          formName="register"
          name="email"
          title="E-mail"
        />
        <InputField
          type="password"
          formName="register"
          name="password"
          title="Пароль"
        />
      </AuthForm>
      <div className="register__link-question">
        Уже зарегистрированы?
          <Link className="register__link" to="/signin"> Войти</Link>
      </div>
    </main>
  );
}
