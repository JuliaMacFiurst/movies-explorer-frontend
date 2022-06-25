import React from "react";
import InputError from "../InputError/InputError";
import "./InputField.css";

export default function InputField(props) {
  const { type, formName, name, title, pattern, required, value, onChange, error } = props;

  return (
    <fieldset className={`input-field ${formName}__input-field`}>
      <label className="input-field__label" htmlFor={`${formName}-${name}`}>
        {title}
      </label>
      <input
        className="input-field__input"
        type={type}
        id={`${formName}-${name}`}
        name={name}
        pattern={pattern}
        required={required}
        value={value}
        minLength = "2"
        maxLength="30"
        onChange={onChange}

      />
      <InputError 
        isHidden={!error}
        name={name} 
        type="input" 
        message={error} 
      />
    </fieldset>
  );
}
