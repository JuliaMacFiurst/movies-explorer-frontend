import React from "react";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Logo from "../Logo/Logo";
import InputError from "../InputError/InputError";

import "./AuthForm.css";

export default function AuthForm(props) {
  const { name, title, buttonText } = props;

  return (
    <div className="auth">
      <Logo />
      <h1 className="auth__title">{title}</h1>
      <form className={`auth__form auth__form-${name}`} name={`auth-${name}`}>
        {props.children}
        <InputError
          isHidden={true}
          name={`submit-${name}`}
          type="button"
          message=""
        />
        <ButtonSubmit text={buttonText} />
      </form>
    </div>
  );
}
