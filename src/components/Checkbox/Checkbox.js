import React from "react";

import "./Checkbox.css";

export default function Checkbox({ name, checkboxText, value, onChange }) {

  return (
    <div className="checkbox-container">
      <input 
      className="checkbox" 
      type="checkbox" 
      id={`${name}-checkbox`} 
      checked={value}
     
      onChange={(event) => {
        onChange(!value, event.target.id)
      }}
      value={value}
      />
      <label htmlFor={`${name}-checkbox`} className="checkbox__label"></label>
      <p className="checkbox__text">{checkboxText}</p>
    </div>
  );
}
