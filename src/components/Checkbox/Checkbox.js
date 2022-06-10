import React from "react";

import "./Checkbox.css";

export default function Checkbox({ name, checkboxText }) {
  return (
    <div className="checkbox-container">
      <input className="checkbox" type="checkbox" id={`${name}-checkbox`} />
      <label htmlFor={`${name}-checkbox`} className="checkbox__label"></label>
      <p className="checkbox__text">{checkboxText}</p>
    </div>
  );
}
