import React from "react";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Logo from "../Logo/Logo";
import InputError from "../InputError/InputError";

import "./AuthForm.css";

export default function AuthForm(props) {
  const { name, title, buttonText, onSubmit, isValid, error } = props;

  return (
    <div className="auth">
      <Logo />
      <h1 className="auth__title">{title}</h1>
      <form 
      className={`auth__form auth__form-${name}`} name={`auth-${name}`}
      onSubmit={onSubmit}>
        {props.children}
        <InputError
          type="button"
          name={`submit-${name}`}
          isHidden={error.length === 0}
          message={error}
        />
        <ButtonSubmit text={buttonText} disabled={!isValid || error} />
      </form>
    </div>
  );
}
