import React, { useState } from "react";

import { Link } from "react-router-dom";
import InputField from "../InputField/InputField";
import AuthForm from "../AuthForm/AuthForm";
import { useValidation } from "../../utils/handleValidation";

import "./Register.css";

export default function Register({ onRegister, registerResError }) {
  const [resFail, setResFail] = useState("");

  const {
    values: { name, email, password },
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useValidation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    resetForm({ name, email, password }, {}, false);

    const result = await onRegister({
      name,
      email,
      password,
    });

    if (result === !isValid) {
      setResFail(result.error);
    } else {
      resetForm({}, {}, true);
    }
  };
  return (
    <main className="register">
      <AuthForm
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        isValid={isValid}
        error={resFail}
      >
        <InputField
          type="text"
          formName="register"
          name="name"
          title="Имя"
          required
          value={name || ""}
          error={errors.name}
          onChange={handleChange}
        />
        <InputField
          type="email"
          formName="register"
          name="email"
          title="E-mail"
          required
          value={email || ""}
          error={errors.email}
          onChange={handleChange}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />
        <InputField
          type="password"
          formName="register"
          name="password"
          title="Пароль"
          required
          value={password || ""}
          error={errors.password}
          onChange={handleChange}
        />
      </AuthForm>
      <span
        className={
          registerResError
            ? "register__res-error register__res-error_type_active"
            : "register__res-error"
        }
      >
        {registerResError}
      </span>
      <div className="register__link-question">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin">
          Войти
        </Link>
      </div>
    </main>
  );
}
