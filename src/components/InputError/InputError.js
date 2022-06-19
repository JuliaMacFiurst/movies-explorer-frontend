import React from "react";

import "./InputError.css";

export default function InputError(props) {
  const { isHidden, name, type, message } = props;
  return (
    <span
      className={`input-error input-error_type_${type} ${
        !isHidden && "input-error_active"
      }`}
      id={`${name}-error`}
    >
      {message}
    </span>
  );
}
