import React from "react";
import InputError from "../InputError/InputError";
import "./InputField.css";

export default function InputField(props) {
  const { type, formName, name, title, minLength = 2, pattern, required, value, onChange, error, setResError } = props;

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
        minLength={minLength}
        maxLength="30"
        onChange={(event) => {
        setResError('')
        onChange(event.target)
        }}

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
