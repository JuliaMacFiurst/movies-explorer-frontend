import React from "react";

import "./ButtonSubmit.css";

export default function ButtonSubmit({ text, disabled }) {
  return (
    <button className="button-submit" type="submit" disabled={disabled}>
      {text}
    </button>
  );
}
