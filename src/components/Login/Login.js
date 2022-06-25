import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import InputField from "../InputField/InputField";
import { useValidation } from "../../utils/handleValidation";

import "./Login.css";

export default function Login({ onLogin, loginResError }) {
  const [resFail, setResFail] = useState("");

  const { values, errors, isValid, handleChange, resetForm } = useValidation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    resetForm(values, {}, false);

    const result = await onLogin(values);

    if (result === !isValid) {
      setResFail(result.error);
    } else {
      resetForm({}, {}, true);
    }
  };
  return (
    <main className="login">
      <AuthForm
        name="login"
        title="Рады видеть!"
        buttonText="Войти"
        isValid={isValid}
        error={resFail}
        onSubmit={handleSubmit}
      >
        <InputField
          type="email"
          formName="login"
          name="email"
          title="E-mail"
          required
          value={values.email || ""}
          onChange={handleChange}
          error={errors.email}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />
        <InputField
          type="password"
          formName="login"
          name="password"
          title="Пароль"
          required
          value={values.password || ""}
          onChange={handleChange}
          error={errors.password}
        />
      </AuthForm>
      <span
        className={
          loginResError
            ? "login__res-error login__res-error_type_active"
            : "login__res-error"
        }
      >
        {loginResError}
      </span>
      <div className="login__link-question">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup">
          {" "}
          Регистрация
        </Link>
      </div>
    </main>
  );
}
